const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const date = require('date-and-time');

const TrackSchema = new mongoose.Schema({
    track_id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    album_id: {
      type: String,
      required: true,
      ref: 'Album',
    },
    artist_id: {
      type:String,
      required: true,
      ref: 'Artist', 
    }
  });
  
  module.exports = mongoose.model('Track', TrackSchema);
  