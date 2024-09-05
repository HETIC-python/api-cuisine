const { log } = require('debug/src/node');
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')
/* GET home page. */
router.get('/getrecipe',async function(req, res, next) {
    try{
        const queries = new URLSearchParams({
            apiKey : process.env.APIKEY

        }).toString()
        const kitchenApi = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${queries}`)
        const data = await kitchenApi.json()
        
        res.status(200).json({success : true, data}) 
    }
    catch{}
});

module.exports = router;
