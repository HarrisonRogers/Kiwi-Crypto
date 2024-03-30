/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('portfolios', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
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
