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

// Iteration 6 - done
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

// Iteration 7 - done
router.get("/movies", (req, res) => {

    Movie.find()
    .then( dbMovies => res.render("movies/movies", { movies: dbMovies}))
    .catch((err) => console.log(`Error while getting movies from the DB: ${err}`));
})

// Iteration 8 - WIP
router.get("/movies/:id", (req, res) => {
    
    Movie.findById(req.params.id)
    .populate('cast')
    .then( movie => res.render("movies/movie-details", movie ) )
    .catch((err) => console.log(`Error while retrieving movie details: ${err}`))

})

// Iteration 9 - done 
router.post("/movies/:id/delete", (req, res) => {

    Movie.findByIdAndRemove(req.params.id)
    .then(() => res.redirect(`/movies?message=deleteSuccess`) )
    .catch(err => next(err))

})

// Iteration 10 - WIP
router.get("/movies/:id/edit", (req, res) => {

    Movie.findById(req.params.id)
    Celebrity.find()
    .then( dataToEdit => res.render("movies/edit-movie", dataToEdit))
    .catch(err => next(err))

})

router.post("/movies/:id/edit", (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie.findByIdAndUpdate(req.params.id)
    .then(editedMovie => {
        res.redirect(`/movies/${editedMovie.id}?message=updatedSuccess`)
    }).catch(err => next(err))

})



module.exports = router;