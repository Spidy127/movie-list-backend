const express = require("express");
const router = express.Router();

const{
    addMoive,
    getAllMovies,
    updateMovie,
    deleteMovie
} = require("../controllers/movieController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getAllMovies);

router.post("/", authMiddleware, addMoive);

router.put("/:id", authMiddleware, updateMovie);

router.delete("/:id", authMiddleware, deleteMovie);

module.exports = router;