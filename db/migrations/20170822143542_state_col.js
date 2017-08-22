
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('metro', (table) => {
      table.string('state').notNullable();
    }),
    knex.schema.table('city', (table) => {
      table.string('state').notNullable();
      table.string('metro').notNullable();
      table.string('county').notNullable();
    }),
    knex.schema.table('neighborhood', (table) => {
      table.string('state').notNullable();
      table.string('metro').notNullable();
      table.string('county').notNullable();
      table.string('city').notNullable();
    }),
    knex.schema.table('zipcode', (table) => {
      table.string('state').notNullable();
      table.string('metro').notNullable();
      table.string('county').notNullable();
      table.string('city').notNullable();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('metro', (table) => {
      table.dropColumn('state');
    }),
    knex.schema.table('city', (table) => {
      table.dropColumn('state');
      table.dropColumn('metro');
      table.dropColumn('county');
    }),
    knex.schema.table('neighborhood', (table) => {
      table.dropColumn('state');
      table.dropColumn('metro');
      table.dropColumn('county');
      table.dropColumn('city');
    }),
    knex.schema.table('zipcode', (table) => {
      table.dropColumn('state');
      table.dropColumn('metro');
      table.dropColumn('county');
      table.dropColumn('city');
    }),
  ]);
};
