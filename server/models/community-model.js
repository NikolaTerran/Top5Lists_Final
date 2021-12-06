const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema({
    item_name: {type: String},
    points: {type: Number}
})

const comment = new Schema({
    user: {type: String},
    words: {type: String}
})

const CommunityListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [Item], required: true },
        likes: {type: [String], required: true},
        dislikes: {type: [String], required: true},
        views: {type: Number, required: true},
        comments: {type: [comment], required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('CommunityList', CommunityListSchema)