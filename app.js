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
