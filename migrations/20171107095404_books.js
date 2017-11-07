
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('books', (table)=>{
      table.increments();
      table.string('title');
      table.string('genre');
      table.text('desc');
      table.string('cover_url');
      table.integer('author_id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('books')
  ])
};
