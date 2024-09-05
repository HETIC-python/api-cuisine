const { log } = require('debug/src/node');
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
const Recipe = require('../models/recipe');
/* GET home page. */
router.get('/getrecipe', async function (req, res, next) {
    try {
        const queries = new URLSearchParams({
            apiKey: process.env.APIKEY,
            // author: true,
            // from front
            includeIngredients: "tomato,cheese",
            addRecipeInformation: true,
            fillIngredients: true,

        }).toString()
        const kitchenApi = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${queries}`)
        const data = await kitchenApi.json()
        if (data?.results?.length === 0) {
            res.json({ success: false, message: "No recipe found" })
        }

        let models = await Promise.all(data.results.map(async (recipe) => {
            const model = new Recipe({
                title: recipe.title,
                image: recipe.image,
                link: recipe.sourceUrl,
                summary: recipe.summary,
                dishTypes: recipe.dishTypes,
                cuisines: recipe.cuisines,
                ingredients: recipe.extendedIngredients.map((ingredient) => ingredient.name), // TODO:
                // likes: recipe.aggregateLikes,
                vegetarian: recipe.vegetarian,
                vegan: recipe.vegan,
                glutenFree: recipe.glutenFree,
                dairyFree: recipe.dairyFree,
                veryHealthy: recipe.veryHealthy,
                cheap: recipe.cheap,
                veryPopular: recipe.veryPopular,
                sustainable: recipe.sustainable,
                lowFodmap: recipe.lowFodmap,
                weightWatcherSmartPoints: recipe.weightWatcherSmartPoints
            })
            const saved = await model.save()
            return saved
        }))

        res.status(200).json({ success: true, models })
    }
    catch (error) {
        console.log("error", error)
        res.json({ success: false, message: "error" })
    }
});

module.exports = router;
