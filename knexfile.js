// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/Images.sqlite3",
    }
  },
  production: {
    client: "pg",
    connection:process.env.PG_URL
  },
};
// hello
