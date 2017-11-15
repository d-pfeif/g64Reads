const express = require('express');
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//routes
const indexRoute = require('./routes/index')
const booksRoute = require('./routes/books')
const authorsRoute = require('./routes/authors')

const app = express();

app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.listen(port, ()=>{
  console.log("KEYBLADE!")
})

app.use('/', indexRoute);
app.use('/books', booksRoute);
app.use('/authors', authorsRoute);


app.get('/api/g64reads/authors', (req,res)=>{

})
