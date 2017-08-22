
exports.up = function (knex, Promise) {
  return knex.schema.table('state', (table) => {
    table.string('abbr').notNullable().unique();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('state', (table) => {
    table.dropColumn('abbr');
  });
};
