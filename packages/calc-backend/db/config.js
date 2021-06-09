require("dotenv").config();

let x = {
  use_env_variable: true,
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
    // sync: {
    //   force: true
    // },
    define: {
      freezeTableName: true
    }
  },
  test: {
    username: "root",
    password: "null",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false
  },
  production: {
    username: "root",
    password: "null",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false
  },
};

module.exports = x;
