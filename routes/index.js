const express = require('express');
const queries = require('../database/queries');

const router = express.Router();

router.get('/', (req,res)=>{
  queries.getBookData()
  .then(bookData => {
    queries.getAuthorData()
    .then(authorData => {
      res.render('index', {
        bookData: bookData,
        authorData: authorData
      })
    })
  })
})

module.exports = router
