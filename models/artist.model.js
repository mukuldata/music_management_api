
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const date = require('date-and-time');

const ArtistSchema = new mongoose.Schema({
    artist_id: {
      type: String,
      required:true,
      unique:true,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    grammy: {
      type: Number,
      default:0,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt:'updated_at'
    },
  }

);


ArtistSchema.pre('save', async function (next) {
  this.set('created_at',date.format(new Date(), 'YYYY-MM-DDTHH:mm:ss.000')+"Z");
  this.set('updated_at',date.format(new Date(), 'YYYY-MM-DDTHH:mm:ss.000')+"Z");
  
  next();
});


  
module.exports = mongoose.model('Artist', ArtistSchema);
  