const express = require('express');
const queries = require('./database/queries')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

const app = express();

app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

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

app.get('/books/new', (req,res)=>{
  queries.getAuthorData()
  .then(data=>{
    res.render('newBookForm', {
      data: data

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

app.get('/authors/:id', (req,res)=>{
  const id = req.params.id;
  queries.getAuthorById(id)
  .then(data=>{
    // res.send(data)
    res.render('oneAuthorPage', {
      data:data
    })
  })
})

app.post('/books/new/post', (req,res)=>{
  // res.send(req.body)
  queries.addBookToDB(req.body).then(bookId => {
    var authArr = req.body.author_array.split(',')
    for(var i = 0; i < authArr.length; i++) {
      queries.addBookAuth(bookId[0], authArr[i])
    }
    res.redirect('/')
  })

})
