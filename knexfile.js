// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database:'tptrader',
      user:'postgres',
      port:5432,
      password:'Holeinone1',
      
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  staging: {
    client: "postgresql",
    connection: {
      database:'tptrader',
      port: 5432,
      user:'postgres',
      password:'Holeinone1',
      
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  production: {
    client: "pg",
    connection: {
      connectionString: 'postgres://postgres:pass@localhost:5432/tptrader',
      ssl: true
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
