const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comment = new Schema({
    user: {type: String},
    words: {type: String}
})

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: {type: String, required: true},
        userName: {type: String, required: true},
        likes: {type: [String], required: true},
        dislikes: {type: [String], required: true},
        views: {type: Number, required: true},
        comments: {type: [comment], required: true},
        status: { type: String, required: true},
        publishedDate: {type: String}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
