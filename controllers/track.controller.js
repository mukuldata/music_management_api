const Track = require("../models/track.model");
const Artist = require("../models/artist.model");
const Album = require("../models/album.model");
const { responseHandler } = require("../utils/public-methods.utils");

exports.getTracks = async (req, res, next) => {
  try {
    const { limit = 5, offset = 0, artist_id, album_id, hidden } = req.query;

    const filter = {};
    if (artist_id) filter.artist_id = artist_id;
    if (album_id) filter.album_id = album_id;
    if (hidden !== undefined) filter.hidden = hidden === "true";

    const tracks = await Track.find(filter)
      .skip(parseInt(offset, 10))
      .limit(parseInt(limit, 10))
      .populate({
        path: "artist_id",
        select: "name",
        model: "Artist",
        localField: "artist_id",
        foreignField: "artist_id",
      })
      .populate({
        path: "album_id",
        select: "name",
        model: "Album",
        localField: "album_id",
        foreignField: "album_id",
      });

    if (tracks.length === 0) {
      return responseHandler(res, 404, null, "Resource Doesn’t Exist");
    }

    const formattedTracks = tracks.map((track) => ({
      track_id: track.track_id,
      artist_name: track.artist_id.name,
      album_name: track.album_id.name,
      name: track.name,
      duration: track.duration,
      hidden: track.hidden,
    }));

    responseHandler(
      res,
      200,
      formattedTracks,
      "Tracks retrieved successfully."
    );
  } catch (error) {
    next(error);
  }
};

exports.getTrackById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const track = await Track.findOne({ track_id: id })
      .populate({
        path: "artist_id",
        select: "name",
        model: "Artist",
        localField: "artist_id",
        foreignField: "artist_id",
      })
      .populate({
        path: "album_id",
        select: "name",
        model: "Album",
        localField: "album_id",
        foreignField: "album_id",
      });

    if (!track) {
      return responseHandler(res, 404, null, "Resource Doesn’t Exist");
    }

    const trackFormatted = {
      track_id: track.track_id,
      name: track.name,
      duration: track.duration,
      hidden: track.hidden,
      artist_name: track.artist_id.name,
      album_name: track.album_id.name,
    };

    responseHandler(res, 200, trackFormatted, "Track retrieved successfully.");
  } catch (error) {
    next(error);
  }
};

exports.addTrack = async (req, res, next) => {
  try {
    // Extract data from the request body
    const { artist_id, album_id, name, duration, hidden } = req.body;

    // Check if the album exists in the database
    const album = await Album.findOne({ album_id, artist_id });

    if (!album) {
      return responseHandler(res, 404, null, "Resource Doesn’t Exist");
    }

    // Create a new Track
    const newTrack = new Track({
      artist_id,
      album_id,
      name,
      duration,
      hidden,
    });

    await newTrack.save();

    // Send success response
    return responseHandler(res, 201, null, "Track created successfully.");
  } catch (error) {
    next(error);
  }
};

exports.updateTrack = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, duration, hidden } = req.body;

    const track = await Track.findOne({ track_id: id });

    if (!track) {
      return responseHandler(res, 404, null, "Resource Doesn’t Exist");
    }

    if (name !== undefined) track.name = name;
    if (duration !== undefined) track.duration = duration;
    if (hidden !== undefined) track.hidden = hidden;

    await track.save();

    return responseHandler(res, 204, null, "Track updated successfully.");
  } catch (error) {
    next(error);
  }
};

exports.deleteTrack = async (req, res, next) => {
  try {
    const { id } = req.params;

    const track = await Track.findOneAndDelete({ track_id: id });

    if (!track) {
      return responseHandler(res, 404, null, "Resource Doesn’t Exist");
    }

    return responseHandler(
      res,
      200,
      null,
      `Track:${track.name} deleted successfully.`
    );
  } catch (error) {
    next(error);
  }
};
