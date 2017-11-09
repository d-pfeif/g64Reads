const db = require('./connection')

function getBookData() {
  return db('books').select('*')
}

function getAuthorData() {
  return db('authors').select('*')
}

function getAllBookData() {
  return db('authors').select('*').join('booksAndAuthors', 'authors.id', 'author_id').fullOuterJoin('books', 'booksAndAuthors.book_id', 'books.id' )
  .then(data=>{
    // return data
    let arrBooks = []
    var bookInfo = new Object()

    for (var i = 0; i < data.length; i++) {
      var bookId = data[i].id
      if (arrBooks.indexOf(bookId) === -1) {
        bookInfo[bookId] = new Object();
        bookInfo[bookId].title = data[i].title;
        bookInfo[bookId].authors = [];
        bookInfo[bookId].genre = data[i].genre;
        bookInfo[bookId].desc = data[i].desc;
        bookInfo[bookId].url = data[i].cover_url;
        bookInfo[bookId].book_id = data[i].book_id;

        arrBooks.push(bookInfo)
      }
    }

    for (var i = 0; i < data.length; i++) {
      for (var j = 1; j < Object.keys(arrBooks[0]).length + 1; j++) {
        if (data[i].book_id == arrBooks[0][j].book_id) {
          arrBooks[0][j]["authors"].push(" " + data[i].firstName + ' ' + data[i].lastName)
        }

      }
    }
    return arrBooks[0]
  })
}

function getOneBook(id) {
  return db('authors').join('booksAndAuthors', 'authors.id', 'author_id').fullOuterJoin('books', 'booksAndAuthors.book_id', 'books.id').select('*').where('books.id', id)
  .then(data => {
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
        bookInfo[bookId].book_id = data[i].book_id

        arrBooks.push(bookInfo)
      }
    }

    for (var i = 0; i < data.length; i++){
      arrBooks[0][id].authors.push(" " + data[i].firstName + " " + data[i].lastName)
    }
    // return data
    return arrBooks[0][id]
  })
}

function getAllAuthorData(){
  return db('authors').select().join('booksAndAuthors', 'booksAndAuthors.author_id', 'authors.id').join('books', 'booksAndAuthors.book_id', 'books.id')
  .then(data => {

    var arrAuthors = []
    var authorInfo = new Object()
    for (var i = 0; i < data.length; i++){
      var authId = data[i]["author_id"]
      if (arrAuthors.indexOf(authId) === -1) {
        authorInfo[authId] = new Object();
        authorInfo[authId].name = data[i].firstName + " " + data[i].lastName
        authorInfo[authId].portrate_url = data[i].portrate_url
        authorInfo[authId].bio = data[i].bio
        authorInfo[authId].author_id = data[i].author_id
        authorInfo[authId].books = []

        arrAuthors.push(authorInfo)
      }
    }

    for (var i = 0; i < data.length; i++) {
      for (var j = 1; j < Object.keys(arrAuthors[0]).length + 1; j++) {
        if (data[i].author_id == arrAuthors[0][j].author_id) {
          arrAuthors[0][j]["books"].push(" " + data[i].title)
        }
      }
    }

    return arrAuthors[0]
  })
}


module.exports = {
  getBookData,
  getAuthorData,
  getAllBookData,
  getOneBook,
  getAllAuthorData
}
