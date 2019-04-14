exports.up = function generateDBschema(knex) {
  return knex.schema.createTable('Coins', (table) => {
    table.increments('id').primary();
    table.string('symbol').notNullable();
    table.string('name', 120).notNullable();
    table.integer('market_cap').notNullable();
    table.integer('usd_price').notNullable();
    table.integer('btc_price').notNullable();
    table.integer('circulation').notNullable();
    table.integer('volume').notNullable();
    table.integer('fluctuation_hour').notNullable();
    table.integer('fluctuation_day').notNullable();
    table.integer('fluctuation_week').notNullable();
  });
};

exports.down = function rollBackMigrations(knex) {
  return knex.schema.dropTableIfExists('Coins');
};
