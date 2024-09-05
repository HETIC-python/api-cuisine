const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    }
})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like