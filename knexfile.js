require('dotenv').config()
// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'g64Reads'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
