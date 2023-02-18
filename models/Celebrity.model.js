//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPrase: String
    },
    {
        timestamps: true
    }
);

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;