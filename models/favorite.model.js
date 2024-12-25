const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const date = require('date-and-time');

const FavoritesSchema = new mongoose.Schema({
    favorite_id: {
      type: String,
      required:true,
      unique:true,
      default: uuidv4,
    },
    user_id: {
      type: String,
      required: true,
      ref: 'User',
    },
    favorites: {
      artists: [{ type: String, ref: 'Artist' }],
      albums: [{ type: String, ref: 'Album' }],
      tracks: [{ type: String, ref: 'Track' }],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt:'updated_at'
    },
  }
);

FavoritesSchema.pre('save', async function (next) {
  this.set('created_at',date.format(new Date(), 'YYYY-MM-DDTHH:mm:ss.000')+"Z");
  this.set('updated_at',date.format(new Date(), 'YYYY-MM-DDTHH:mm:ss.000')+"Z");
  
  next();
});

  
  module.exports = mongoose.model('Favorite', FavoritesSchema);
  