/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('portfolios').del()
  await knex('portfolios').insert([
    {
      id: 1,
      authO_id: 'google-oauth2|105824766354355807683',
      coin_id: 1,
      coin_name: 'Bitcoin',
      amount: 100000.23,
    },
    {
      id: 2,
      authO_id: 'google-oauth2|105824766354355807683',
      coin_id: 1027,
      coin_name: 'Ethereum',
      amount: 6034.45,
    },
  ])
}
