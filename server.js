const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db/connection'); 
const {responseHandler} =require("./utils/public-methods.utils")
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const artistRoutes = require('./routes/artist.routes');
const albumRoutes = require('./routes/album.routes');
const trackRoutes = require('./routes/track.routes');
const favoriteRoutes = require('./routes/favourite.routes');



const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json()); 

app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/tracks', trackRoutes);
app.use('/favorites', favoriteRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack); 
  responseHandler(res, 500, null,'Internal Server Error', err.message,);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
