
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('authors', (table)=>{
      table.increments();
      table.string('firstName');
      table.string('lastName');
      table.text('bio');
      table.string('portrate_url');
      table.integer('book_id').references('books.id').onDelete('CASCADE')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('authors')
  ])
};
