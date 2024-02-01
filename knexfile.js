module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      user: 'linkshort',
      password: 'myreallycoolpassword',
      database: 'linkshort',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};
