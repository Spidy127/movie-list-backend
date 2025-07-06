const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();
//Middleware
app.use(express.json());

//Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const movieRoutes = require("./routes/movieRoutes" );
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running  on port ${PORT}`);
});