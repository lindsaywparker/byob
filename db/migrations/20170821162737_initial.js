
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('state', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
      table.date('collected_on').notNullable();
      table.integer('median_rent').notNullable().unsigned();
      table.decimal('monthly_change').notNullable();
      table.decimal('quarterly_change').notNullable();
      table.decimal('yearly_change').notNullable();
      table.integer('size_rank').unique().notNullable().unsigned();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('metro', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
      table.integer('state_id').unsigned().notNullable();
      table.foreign('state_id').references('state.id');
      table.date('collected_on').notNullable();
      table.integer('median_rent').notNullable();
      table.decimal('monthly_change').notNullable();
      table.decimal('quarterly_change').notNullable();
      table.decimal('yearly_change').notNullable();
      table.integer('size_rank').unique().notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('city', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
      table.integer('metro_id').unsigned().notNullable();
      table.foreign('metro_id').references('metro.id');
      table.integer('state_id').unsigned().notNullable();
      table.foreign('state_id').references('state.id');
      table.date('collected_on').notNullable();
      table.integer('median_rent').notNullable();
      table.decimal('monthly_change').notNullable();
      table.decimal('quarterly_change').notNullable();
      table.decimal('yearly_change').notNullable();
      table.integer('size_rank').unique().notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('neighborhood', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
      table.integer('metro_id').unsigned().notNullable();
      table.foreign('metro_id').references('metro.id');
      table.integer('state_id').unsigned().notNullable();
      table.foreign('state_id').references('state.id');
      table.integer('city_id').unsigned().notNullable();
      table.foreign('city_id').references('city.id');
      table.date('collected_on').notNullable();
      table.integer('median_rent').notNullable();
      table.decimal('monthly_change').notNullable();
      table.decimal('quarterly_change').notNullable();
      table.decimal('yearly_change').notNullable();
      table.integer('size_rank').unique().notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('zipcode', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
      table.integer('metro_id').unsigned().notNullable();
      table.foreign('metro_id').references('metro.id');
      table.integer('state_id').unsigned().notNullable();
      table.foreign('state_id').references('state.id');
      table.integer('city_id').unsigned().notNullable();
      table.foreign('city_id').references('city.id');
      table.date('collected_on').notNullable();
      table.integer('median_rent').notNullable();
      table.decimal('monthly_change').notNullable();
      table.decimal('quarterly_change').notNullable();
      table.decimal('yearly_change').notNullable();
      table.integer('size_rank').unique().notNullable();
      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('zipcode'),
    knex.schema.dropTable('neighborhood'),
    knex.schema.dropTable('city'),
    knex.schema.dropTable('metro'),
    knex.schema.dropTable('state'),
  ]);
};
