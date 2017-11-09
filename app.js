const express = require('express');
const queries = require('./database/queries')
const port = process.env.PORT || 3000

const app = express();

app.set('view engine', 'hbs')
app.use(express.static('public'))

app.listen(port, ()=>{
  console.log("KEYBLADE!")
})

app.get('/', (req,res)=>{
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

app.get('/books', (req,res)=>{
  queries.getAllBookData()
  .then(bookData => {
    // res.send(bookData)
    res.render('booksPage', {
      bookData: bookData
    })
  })
})

app.get('/books/:id', (req,res)=>{
  const id = req.params.id;
  queries.getOneBook(id)
  .then(bookData => {
    // res.send(bookData)
    res.render('oneBookPage', {
      bookData: bookData
    })
  })
})

app.get('/authors', (req,res)=>{
  queries.getAllAuthorData()
  .then(data=>{
    // res.send(data)
    res.render('authorPage', {
      data: data
    })
  })
})
