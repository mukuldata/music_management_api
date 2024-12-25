const Album = require("../models/album.model");
const Artist = require("../models/artist.model");
const { responseHandler } = require("../utils/public-methods.utils");

exports.getAlbums = async (req, res, next) => {
  const { limit = 5, offset = 0, artist_id, hidden } = req.query;

  try {
    const filter = {};
    if (artist_id) filter.artist_id = artist_id;
    if (typeof hidden !== "undefined") filter.hidden = hidden === "true";

    console.log(filter);
    const albums = await Album.find(filter)
      .skip(Number(offset))
      .limit(Number(limit))
      .lean()
      .populate({
        path: "artist_id",
        select: "name",
        model: "Artist",
        localField: "artist_id",
        foreignField: "artist_id",
      });

    if (!albums.length) {
      return responseHandler(
        res,
        404,
        null,
        "Artist not found, not valid artist ID"
      );
    }

    const formattedAlbums = albums.map((album) => ({
      album_id: album.album_id,
      artist_name: album.artist_id.name,
      name: album.name,
      year: album.year,
      hidden: album.hidden,
    }));

    return responseHandler(
      res,
      200,
      formattedAlbums,
      "Albums retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

exports.getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const album = await Album.findOne({ album_id: id }).populate({
      path: "artist_id",
      select: "name",
      model: "Artist",
      localField: "artist_id",
      foreignField: "artist_id",
    });

    console.log(album);

    if (!album) {
      return responseHandler(res, 404, null, "Resource doesn't exist");
    }

    return responseHandler(
      res,
      200,
      {
        album_id: album._id,
        artist_name: album.artist_id.name,
        name: album.name,
        year: album.year,
        hidden: album.hidden,
      },
      "Album retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

exports.addAlbum = async (req, res, next) => {
  try {
    const { artist_id, name, year, hidden } = req.body;

    const artist = await Artist.findOne({ artist_id });

    if (!artist) {
      return responseHandler(res, 404, null, "Resource doesn't exist");
    }

    const newAlbum = new Album({
      artist_id: artist.artist_id,
      name,
      year,
      hidden,
    });

    await newAlbum.save();

    return responseHandler(res, 201, null, "Album created successfully");
  } catch (error) {
    next(error);
  }
};

exports.updateAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedAlbum = await Album.findOneAndUpdate(
      { album_id: id },
      updateFields,
      { new: true }
    );

    if (!updatedAlbum) {
      return responseHandler(res, 404, null, "Resource Doesn’t Exist");
    }

    responseHandler(res, 204, null, "Album updated successfully.");
  } catch (error) {
    next(error);
  }
};

exports.deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    const album = await Album.findOneAndDelete({ album_id: id });

    if (!album) {
      return responseHandler(res, 404, null, "Resource Doesn’t Exist");
    }

    responseHandler(
      res,
      200,
      null,
      `Album: ${album.name} deleted successfully.`
    );
  } catch (error) {
    next(error);
  }
};
