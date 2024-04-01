/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('portfolios', (table) => {
    table.increments('id').primary()
    table.integer('authO_id')
    table.string('coin_id')
    table.string('coin_name')
    table.integer('price')
    table.integer('percent_change_1h')
    table.integer('percent_change_24h')
    table.integer('percent_change_7d')
    table.integer('market_cap')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('portfolios')
}
