// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/rent_indices',
    migrations: {
      directory: './db/migrations',
    },
    useNullAsDefault: true,
  },

};
