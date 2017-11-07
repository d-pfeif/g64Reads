const express = require('express');

const app = express();

app.set('view engine', 'hbs')
app.use(express.static('public'))

app.listen(3000, (req,res)=>{
  console.log("KEYBLADE!")
})

app.get('/', (req,res)=>{
  res.render('index')
})
