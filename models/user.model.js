
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const date = require('date-and-time');

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: uuidv4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer',
  },
  createdBy: {
        type: String,
        ref: 'User', 
        default: null,
      }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt:'updated_at'
  },
}
);


UserSchema.pre('save', async function (next) {
  this.set('created_at',date.format(new Date(), 'YYYY-MM-DDTHH:mm:ss.000')+"Z");
  this.set('updated_at',date.format(new Date(), 'YYYY-MM-DDTHH:mm:ss.000')+"Z");
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});



module.exports = mongoose.model('User', UserSchema);
