var express = require('express');
var router = express.Router();

const Book = require("../models/Book")

/* GET home page. */
router.get('/', (req, res, next) => {
    Book.find()
    .then(allTheBooksFromDB => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log('Retrieved books from DB:', allTheBooksFromDB);
 
      // we call the render method after we obtain the books data from the database -> allTheBooksFromDB
      res.render('books/books-list.hbs', { books: allTheBooksFromDB }); // pass `allTheBooksFromDB` to the view (as a variable books to be used in the HBS)
    })
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});
 

router.get('/details/:bookId', (req, res, next) => {

    Book.findById(req.params.bookId)
        .then((book) => {
            console.log("Found book:", book)
            res.render('books/book-details.hbs', book)
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
})

module.exports = router;
