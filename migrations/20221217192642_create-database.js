/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require("bcrypt");
exports.up = async function (knex) {
  await knex.schema.createTable("Users", function (table) {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.boolean("admin").notNullable();
    table.timestamps(true, true);
  });
  await knex.schema.createTable("Images", function (table) {
    table.increments("id").primary();

    table.string("img").notNullable();
    table.timestamps(true, true);
  });
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt);
 
    // Store hash in your password DB.
    await knex
      .insert({
        id: 1,
        first_name: "Oussama",
        last_name: "Jedda",
        email:process.env.ADMIN_EMAIL,
        password: hash,
        admin: true,
      })
      .into("Users");
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTableIfExists("Users").dropSchemaIfExists("Images");
};
