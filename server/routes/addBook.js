const express = require("express")
const router = express.Router()

const {createBook, getBook, deleteOneBook, updateBook} = require("../controllers/addBook")

router.post('/addbook',createBook)
router.get('/getbooks',getBook)
router.post('/deleteOneBook',deleteOneBook)
router.put('/updateBook',updateBook)
module.exports = router
