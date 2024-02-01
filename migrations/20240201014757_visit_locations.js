/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('visit_locations', table => {
    table.increments('id').primary();
    table.string('country_code', 255);
    table.string('country_name', 255);
    table.string('region_name', 255);
    table.string('city_name', 255);
    table.string('timezone', 255);
    table.float('lat');
    table.float('lon');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('visit_locations');
};
