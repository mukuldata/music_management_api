const Artist = require("../models/artist.model");
const { responseHandler } = require("../utils/public-methods.utils");

exports.getArtists = async (req, res, next) => {
  try {
    const { limit = 5, offset = 0, grammy, hidden } = req.query;

    const filters = {};
    if (grammy !== undefined) filters.grammy = parseInt(grammy, 10);
    if (hidden !== undefined) filters.hidden = hidden === "true";

    const artists = await Artist.find(filters)
      .skip(parseInt(offset, 10))
      .limit(parseInt(limit, 10))
      .select("artist_id name grammy hidden -_id");

    return responseHandler(
      res,
      200,
      artists,
      "Artists retrieved successfully.",
      null
    );
  } catch (error) {
    next(error);
  }
};

exports.getArtistById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findOne({ artist_id: id }).select(
      "artist_id name grammy hidden -_id"
    );

    if (!artist) {
      return responseHandler(res, 404, null, "Artist not found.", null);
    }

    return responseHandler(
      res,
      200,
      artist,
      "Artist retrieved successfully.",
      null
    );
  } catch (error) {
    next(error);
  }
};

exports.addArtist = async (req, res) => {
  try {
    const { name, grammy, hidden } = req.body;

    const newArtist = new Artist({
      name,
      grammy,
      hidden,
    });

    await newArtist.save();

    return responseHandler(
      res,
      201,
      null,
      "Artist created successfully.",
      null
    );
  } catch (error) {
    next(error);
  }
};

exports.updateArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedArtist = await Artist.findOneAndUpdate(
      { artist_id: id },
      updateFields,
      { new: true }
    );

    if (!updatedArtist) {
      return responseHandler(res, 404, null, "Artist Not Found");
    }

    responseHandler(res, 204, null, "Artist updated successfully.");
  } catch (error) {
    next(error);
  }
};

exports.deleteArtist = async (req, res, next) => {
  const { id } = req.params;

  try {
    const artist = await Artist.findOneAndDelete({ artist_id: id });

    if (!artist) {
      return responseHandler(res, 404, null, "Artist not found.", null);
    }

    return responseHandler(
      res,
      200,
      { artist_id: id },
      `Artist: ${artist.name} deleted successfully.`,
      null
    );
  } catch (error) {
    next(error);
  }
};
