
exports.up = function(knex) {
  return knex.schema.table('cars', tbl => {
    tbl.text('transmission', 'mediumtext');
    tbl.text('status', 'mediumtext');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
