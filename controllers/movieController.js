
const Movie = require("../models/Movie");

//addMovie
const addMovie = async(req, res) => {
    const {title, plot, image} = req.body;

    if(!title || !plot || !image){
        return res.status(400).json({ message: "All fields are required" });
    }
    try{
        const movie = new Movie({
            title,
            plot,
            image,
            user: req.user.id
        });
        await movie.save();
        res.status(201).json({message: "Movie added successfully", movie });
    }
    catch(err){
        res.status(500).json({message:"Server error", error: err.message });
    }
};
//getAllMovie
const getAllMovie = async (req,res) => {
    try{
        const movies = await Movie.find().populate("user", "name email");
    }
    catch (err){
        res.status(500).json({message: "Server error", error: err.message });
    }
};

//updateMovie
const updateMovie = async (req, res) => {
    const {title, plot, image } = req.body;
    const moiveId = req.params.id;

    try{
        const movie = await Movie.findById(movieId);

        if(!movie){
            return res.status(404).json({message : "Movie not found" });
        }

        if(movie.user.toString() !== req.user.id){
            return res.status(403).json({messag : "Bad requsted " });
        }
        movie.title = title || movie.title;
        movie.plot = plot || movie.plot;
        movie.image = image || movie.image;

        await movie.save();
        res.status(200).json({messsage :"Movie update", movie});
    }
    catch (err){
        res.status(500).json({message: "Server error", error:err.message });
    }
};
//deleteMovie
const deleteMovie = async (req, res) => {
    const movieId = req.params.id;

    try{
        const movie = await Movie.findById(movieId);

        if(!movie) {
            return res.status(403).json({message: "Movie not found" });
        }
        if(movie.user.toString() !== req.user.id) {
            return res.status(403).json({message: "Unauthorized" });
        }
        await movie.deleteOne();
        res.status(200).json({message: "Movie deleted successfully" });
    }
    catch(err){
        res.status(500).json({message: "Server error", error: err.message });
    }
};

module.export = {
    addMovie,
    getAllMovie,
    updateMovie,
    deleteMovie
};