
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('books_authors', (table)=>{
      table.increments();
      table.integer('book_id');
      table.integer('author_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('books_authors')
  ])
};
