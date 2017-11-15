const express = require('express');
const queries = require('../database/queries');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/', (req,res)=>{
  queries.getAllAuthorData()
  .then(data=>{
    // res.send(data)
    res.render('authorPage', {
      data: data
    })
  })
})

router.get('/new', (req,res)=>{
  res.render('newAuthorForm')
})

router.get('/:id', (req,res)=>{
  const id = req.params.id;
  queries.getAuthorById(id)
  .then(data=>{
    // res.send(data)
    res.render('oneAuthorPage', {
      data:data,
      authorId: id
    })
  })
})

router.get('/:id/delete', (req,res)=>{
  const id = req.params.id;
  queries.getAuthorById(id)
  .then(data=>{
    // res.send(data)
    res.render('deleteAuthor', {
      data:data,
      authorId: id
    })
  })
})

router.delete('/:id/delete', (req,res)=>{
  const id = req.params.id;
  // res.send('I want to delete ' + id)
  queries.deleteAuthor(id)
  .then(data=>{
    res.redirect('/')
  })
})

router.post('/new/post', (req,res)=>{
  // res.send(req.body)
  queries.addAuthorToDB(req.body)
  .then(data => {
    res.redirect('/')
  })

  // res.send(req.body)
})

module.exports = router
