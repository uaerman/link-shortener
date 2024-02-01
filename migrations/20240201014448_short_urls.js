/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('short_urls', function(table) {
    table.increments('id').primary();
    table.integer('domain_id').references('id').inTable('domains');
    table.string('short_code', 6).notNullable();
    table.string('original_url', 2048).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('valid_since');
    table.timestamp('valid_until');
    table.integer('max_visits');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('short_urls');
};
