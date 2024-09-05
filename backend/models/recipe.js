const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    likes: {
        type: Number,
        required: false
    },
    summary: {
        type: String,
    },
    dishTypes: [String],
    cuisines: [String],
    vegetarian: Boolean,
    vegan: Boolean,
    glutenFree: Boolean,
    dairyFree: Boolean,
    veryHealthy: Boolean,
    cheap: Boolean,
    veryPopular: Boolean,
    sustainable: Boolean,
    lowFodmap: Boolean,
    weightWatcherSmartPoints: Number,
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe