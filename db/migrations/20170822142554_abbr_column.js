
exports.up = function (knex) {
  return knex.schema.table('state', (table) => {
    table.string('abbr').notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.table('state', (table) => {
    table.dropColumn('abbr');
  });
};
