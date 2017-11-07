const db = require('./connection')

function getBookData() {
  return db('books').select('*')
}

function getAuthorData() {
  return db('authors').select('*')
}

module.exports = {
  getBookData,
  getAuthorData
}
