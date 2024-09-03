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
      price: 100000.23,
      percent_change_1h: 10,
      percent_change_24h: 5,
      percent_change_7d: 21.2,
      market_cap: 1000000033,
    },
    {
      id: 2,
      authO_id: 'google-oauth2|105824766354355807683',
      coin_id: 1027,
      coin_name: 'Ethereum',
      price: 6034.45,
      percent_change_1h: 15,
      percent_change_24h: 80,
      percent_change_7d: 120,
      market_cap: 123235875850,
    },
    {
      id: 3,
      authO_id: 'google-oauth2|118265131578351540850',
      coin_id: 1027,
      coin_name: 'Ethereum',
      price: 6034.45,
      percent_change_1h: 15,
      percent_change_24h: 80,
      percent_change_7d: 120,
      market_cap: 123235875850,
    },
  ])
}
