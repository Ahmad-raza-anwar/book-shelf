const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    authorName: {
        type : String,
        required : [true, "Author is required"]
    },
    bookName: {
        type : String,
        required : [true, "Book is required"]
    },
    Publication_house: {
        type : String,
        required : [true, "Publication_house is required"]
    },
    Publication_date: {
        type : String,
        required : [true, "Publication_date is required"]
    },
    Publication_year: {
        type : String,
        required : [true, "Publication_year is required"]
    },
    genre: {
        type : String,
        required : [true, "genre is required"]
    },
    category: {
        type : String,
        required : [true, "category is required"]
    }
})

module.exports = mongoose.model("book",BookSchema)