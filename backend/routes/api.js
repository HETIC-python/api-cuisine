const { log } = require('debug/src/node');
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
const Recipe = require('../models/recipe');
const Like = require('../models/likes');
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



router.get('/all-recipes', async function (req, res, next) {
    try {
        const data = await Recipe.find()
        res.status(200).json({ success: true, data })
    } catch (error) {
        console.log("error", error)
        res.json({ success: false, message: "error" })
    }
});

router.get('/like/:id', async function (req, res, next) {
    try {
        const id = req.params.id
        if (!id) {
            res.json({ success: false, message: "id is required" })
        }
        const recipe = await Recipe.findById(req.params.id)
        if (!recipe) {
            return res.json({ success: false, message: "No recipe found" })
        }
        const like = await Like.findOne({ recipeId: recipe._id })
        console.log("like", like)
        if (!like) {
            return res.status(400).json({ success: false, like: false })
        }
        return res.status(200).json({ success: true, like: !!like })
    } catch (error) {
        console.log("error", error)
        return res.json({ success: false, message: "error" })
    }
});

router.post('/like/:id', async function (req, res, next) {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({ success: false, message: "id is required" })
        }
        const recipe = await Recipe.findById(req.params.id)
        if (!recipe) {
            return res.json({ success: false, message: "No recipe found" })
        }
        let like = new Like({ recipeId: recipe._id })
        like = await like.save()
        return res.status(200).json({ success: true, data: recipe })
    } catch (error) {
        console.log("error", error)
        res.json({ success: false, message: "error" })
    }
});

module.exports = router;
