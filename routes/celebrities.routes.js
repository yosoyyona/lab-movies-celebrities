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
            res.render("celebrities/new-celebrity");
        return;
        }
    })
    .catch((err) => console.log(`Error while creating a new celebrity: ${err}`));


})


module.exports = router;