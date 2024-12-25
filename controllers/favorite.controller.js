const Favorite = require("../models/favorite.model");
const Artist = require("../models/artist.model");
const Album = require("../models/album.model");
const Track = require("../models/track.model");
const { responseHandler } = require("../utils/public-methods.utils");

exports.getFavorites = async (req, res, next) => {
  const { category } = req.params;
  const { limit = 5, offset = 0 } = req.query;

  try {
    const favorites = await Favorite.findOne({ user_id: req.user.user_id });
    if (!favorites) {
      responseHandler(res, 404, null, "Favorites Not Found");
    }

    let relatedData = [];
    let categoryIds = [];

    if (category === "artist") {
      categoryIds = favorites.favorites.artists || [];
      relatedData = await Artist.find({ artist_id: { $in: categoryIds } })
        .skip(parseInt(offset, 10))
        .limit(parseInt(limit, 10));
    } else if (category === "album") {
      categoryIds = favorites.favorites.albums || [];
      relatedData = await Album.find({ album_id: { $in: categoryIds } })
        .skip(parseInt(offset, 10))
        .limit(parseInt(limit, 10));
    } else if (category === "track") {
      categoryIds = favorites.favorites.tracks || [];
      relatedData = await Track.find({ track_id: { $in: categoryIds } })
        .skip(parseInt(offset, 10))
        .limit(parseInt(limit, 10));
    } else {
      responseHandler(res, 400, null, "Bad Request : Invalid Category");
    }

    // Step 3: Map the results into the desired format
    const formattedFavorites = relatedData.map((item) => ({
      favorite_id: favorites.favorite_id,
      category: category,
      item_id:
        category === "artist"
          ? item.artist_id
          : category === "album"
          ? item.album_id
          : category === "track"
          ? item.track_id
          : null,
      name: item.name,
      created_at: favorites.created_at,
    }));

    return responseHandler(
      res,
      200,
      formattedFavorites,
      "Favorites retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    const { category, item_id } = req.body;

    let item = null;

    let favorite = await Favorite.findOne({ user_id: req.user.user_id });

    if (!favorite) {
      favorite = new Favorite({
        user_id: req.user.user_id,
        favorites: { artists: [], albums: [], tracks: [] },
      });
    }

    if (category === "artist") {
      item = await Artist.findOne({ artist_id: item_id });
    } else if (category === "album") {
      item = await Album.findOne({ album_id: item_id });
    } else if (category === "track") {
      item = await Track.findOne({ track_id: item_id });
    }
    if (!item) {
      return responseHandler(res, 404, null, "Resource Doesn't Exist");
    }

    if (category === "artist") {
      if (!favorite.favorites.artists.includes(item_id)) {
        favorite.favorites.artists.push(item_id);
      } else {
        return responseHandler(
          res,
          409,
          null,
          "Bad Request",
          "This artist is already in favorites"
        );
      }
    } else if (category === "album") {
      if (!favorite.favorites.albums.includes(item_id)) {
        favorite.favorites.albums.push(item_id);
      } else {
        return responseHandler(
          res,
          409,
          null,
          "Bad Request",
          "This album is already in favorites"
        );
      }
    } else if (category === "track") {
      if (!favorite.favorites.tracks.includes(item_id)) {
        favorite.favorites.tracks.push(item_id);
      } else {
        return responseHandler(
          res,
          409,
          null,
          "Bad Request",
          "This track is already in favorites"
        );
      }
    }

    await favorite.save();

    return responseHandler(res, 201, null, "Favorite added successfully");
  } catch (error) {
    next(error);
  }
};

exports.deleteFavorite = async (req, res, next) => {
  const favoriteId = req.params.favorite_id;

  try {
    const favorite = await Favorite.findOneAndDelete({
      favorite_id: favoriteId,
    });

    if (!favorite) {
      return responseHandler(res, 404, null, "Favorite not found.", null);
    }

    return responseHandler(
      res,
      200,
      null,
      "Favorite removed successfully.",
      null
    );
  } catch (error) {
    next(error);
  }
};
