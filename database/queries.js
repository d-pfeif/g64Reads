const db = require('./connection')

function getBookData() {
  return db('books').select('*')
}

module.exports = {
  getBookData
}
