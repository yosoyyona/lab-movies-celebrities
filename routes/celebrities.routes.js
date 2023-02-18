const router = require("express").Router();

// all your routes here
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res) => res.render("celebrities/new-celebrity"));

router.post("/celebrities/create", (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity.findOne({ name })
    .then((dbCelebrities) => {

        if (!dbCelebrities)
        {
            Celebrity.create({ name, occupation, catchPhrase })
            .then(()=> res.redirect('/celebrities'))
        }
        else {
            res.render("celebrities/new-celebrity", {message: "The celebrity is already registered."});
        return;
        }
    })
    .catch((err) => console.log(`Error while adding a new celebrity: ${err}`));

})

router.get("/celebrities", (req, res) => {
    Celebrity.find()
    .then((dbCelebrities) => res.render("celebrities/celebrities", { celebrities: dbCelebrities}))
    .catch((err) => console.log(`Error while getting celebrities from the DB: ${err}`));
})


module.exports = router;