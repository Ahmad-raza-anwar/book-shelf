const BookSchema  = require('../models/book')

//  ----------------------  userSignup --------------------------

exports.createBook = async (req,res) => {
    console.log(req.body);
  
    BookSchema.findOne({"authorName":{"$regex":`${req.body.authorName}`,"$options":"i"}, "bookName":{"$regex":`${req.body.bookName}`,"$options":"i"}}).then(author => {
        if(author){
            res.send({err:"Already Exists"})
        }
        else{
            const book = new BookSchema(req.body)
            book.save(book).then(data=>{
                res.send(data)
            })
            .catch(err=>{
                res.send(err)
            })
        }
    })
}


exports.getBook = async (req, res) => {
    var data = await BookSchema.find()
    res.send(data)
}


exports.deleteOneBook = async (req, res) => {
    console.log(req.body);
    BookSchema.findOneAndDelete({_id:req.body.id}).then(resp=>{
        res.send({message: 'Item Deleted'})
    })
}


exports.updateBook = async (req, res) => {
    var resp = await BookSchema.updateOne({_id: req.body.id}, {$set: {
        Publication_date: req.body.Publication_date,
        Publication_house: req.body.Publication_house,
        Publication_year: req.body.Publication_year,
        authorName: req.body.authorName,
        bookName: req.body.bookName,
        category: req.body.category,
        genre: req.body.genre,
    }})
    res.send({
        message: 'Item Updated Successfuly'
    })
}

