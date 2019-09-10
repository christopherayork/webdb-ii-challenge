
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('VIN', 'mediumtext').unique().notNullable();
    tbl.text('make', 'mediumtext').notNullable();
    tbl.text('model', 'mediumtext').notNullable();
    tbl.decimal('mileage').notNullable(); // precision defaults to 8, scale defaults to 2
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cars');
};
