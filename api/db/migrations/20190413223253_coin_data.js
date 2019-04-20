exports.up = function generateDBschema(knex) {
  return knex.schema.createTable('Coins', (table) => {
    table.increments('id').primary();
    table.string('symbol').notNullable();
    table.string('name', 120).notNullable();
    table.integer('market_cap').defaultTo(0);
    table.integer('usd_price').notNullable();
    table.integer('circulation').defaultTo(0);
    table.integer('volume').defaultTo(0);
    table.integer('fluc_h').defaultTo(0);
    table.integer('fluc_d').defaultTo(0);
    table.integer('fluc_w').defaultTo(0);
  });
};

exports.down = function rollBackMigrations(knex) {
  return knex.schema.dropTableIfExists('Coins');
};
