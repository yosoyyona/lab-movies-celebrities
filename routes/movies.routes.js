const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
// all your routes here
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res) => {
    
    Celebrity.find()
    .then( dbCelebrities => {
        res.render("movies/new-movie", { dbCelebrities })
    })
    .catch((err) => {console.log(err)})

});

router.post("/movies/create", (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie.findOne({ title })
    .then( dbMovies => {

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

router.get("/movies", (req, res) => {
    Movie.find()
    .then((dbMovies) => res.render("movies/movies", { movies: dbMovies}))
    .catch((err) => console.log(`Error while getting movies from the DB: ${err}`));
})


module.exports = router;