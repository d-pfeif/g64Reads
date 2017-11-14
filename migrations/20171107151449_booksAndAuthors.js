
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('books_authors', (table)=>{
      table.increments();
      table.integer('book_id').references('books.id').onDelete('CASCADE');
      table.integer('author_id').references('authors.id').onDelete('CASCADE');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('books_authors')
  ])
};
