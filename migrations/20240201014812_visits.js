/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('visits', table => {
    table.increments('id').primary();
    table.integer('short_url_id').references('id').inTable('short_urls');
    table
      .integer('visit_location_id')
      .references('id')
      .inTable('visit_locations');
    table.string('referer', 2024);
    table.timestamp('date').notNullable().defaultTo(knex.fn.now());
    table.string('remote_address', 255);
    table.string('user_agent', 1024);
    table.string('visited_url', 2048);
    table.string('type', 255);
    table.smallint('bot').defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('visits');
};
