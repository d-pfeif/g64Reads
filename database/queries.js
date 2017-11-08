const db = require('./connection')

function getBookData() {
  return db('books').select('*')
}

function getAuthorData() {
  return db('authors').select('*')
}

function joinTables() {
  return db('authors').select('*').join('booksAndAuthors', 'authors.id', 'author_id').fullOuterJoin('books', 'booksAndAuthors.book_id', 'books.id' )
  .then(data=>{
    // return data
    let arrBooks = []
    var bookInfo = new Object()

    for (var i = 0; i < data.length; i++) {
      var bookId = data[i].id
      if (arrBooks.indexOf(bookId) === -1) {
        bookInfo[bookId] = new Object()
        bookInfo[bookId].title = data[i].title
        bookInfo[bookId].authors = []
        bookInfo[bookId].genre = data[i].genre
        bookInfo[bookId].desc = data[i].desc
        bookInfo[bookId].url = data[i].cover_url
        bookInfo[bookId].id = data[i].book_id

        arrBooks.push(bookInfo)
      }
    }

    for (var i = 0; i < data.length; i++) {
      for (var j = 1; j < Object.keys(arrBooks[0]).length + 1; j++) {
        if (data[i].book_id == arrBooks[0][j].id) {
          arrBooks[0][j]["authors"].push(" " + data[i].firstName + ' ' + data[i].lastName)
        }

      }
    }
    return arrBooks[0]
  })
}

module.exports = {
  getBookData,
  getAuthorData,
  joinTables
}
