const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const date = require('date-and-time');


const AlbumSchema = new mongoose.Schema({
  album_id: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  artist_id: {
    type:String,
    required: true,
    ref: 'Artist',
  },
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt:'updated_at'
  },
}
);

AlbumSchema.pre('save', async function (next) {
  this.set('created_at',date.format(new Date(), 'YYYY-MM-DDTHH:mm:ss.000')+"Z");
  this.set('updated_at',date.format(new Date(), 'YYYY-MM-DDTHH:mm:ss.000')+"Z");
  
  next();
});

module.exports = mongoose.model('Album', AlbumSchema);
