const router = require("express").Router();

// all your routes here
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res) => res.render("movies/new-movie"));

router.post("/movies/create", (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie.findOne({ title })
    .then((dbMovies) => {

        if (!dbMovies)
        {
            Movie.create({ title, genre, plot, cast })
            .then(()=> res.redirect('/movies'))
        }
        else {
            res.render("movies/new-movie", {message: "The movie is already registered."});
        return;
        }
    })
    .catch((err) => console.log(`Error while adding a new movie: ${err}`));

})


module.exports = router;