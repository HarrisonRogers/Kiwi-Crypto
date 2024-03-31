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
    table.decimal('amount')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('portfolios')
}
