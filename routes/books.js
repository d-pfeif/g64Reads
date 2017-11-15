const express = require('express');
const queries = require('../database/queries');

const router = express.Router();


router.get('/', (req,res)=>{
  queries.getAllBookData()
  .then(bookData => {
    // res.send(bookData)
    res.render('booksPage', {
      bookData: bookData
    })
  })
})

router.get('/new', (req,res)=>{
  queries.getAuthorData()
  .then(data=>{
    res.render('newBookForm', {
      data: data

    })

  })
})

router.get('/:id', (req,res)=>{
  const id = req.params.id;
  queries.getOneBook(id)
  .then(bookData => {
    // res.send(bookData)
    res.render('oneBookPage', {
      bookData: bookData
    })
  })
})

router.post('/new/post', (req,res)=>{
  // res.send(req.body)
  queries.addBookToDB(req.body).then(bookId => {
    var authArr = req.body.author_array.split(',')
    for(var i = 0; i < authArr.length; i++) {
      queries.addBookAuth(bookId[0], authArr[i])
    }
    res.redirect('/')
  })
})

module.exports = router
