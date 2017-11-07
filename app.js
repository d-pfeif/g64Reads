const express = require('express');
const queries = require('./database/queries')
const port = process.env.PORT || 3000

const app = express();

app.set('view engine', 'hbs')
app.use(express.static('public'))

app.listen(port, (req,res)=>{
  console.log("KEYBLADE!")
})

app.get('/', (req,res)=>{
  queries.getBookData()
  .then(bookData => {
    res.render('index', {
      bookData: bookData
    })

  })
})
