
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, VIN: '123456789', make: 'Boomcars', model: 'Bigboom', mileage: 10000.00},
        {id: 2, VIN: '123456790', make: 'Bigcars', model: 'Superbig', mileage: 8000.00},
        {id: 3, VIN: '123456791', make: 'Lolwuts', model: 'Owo', mileage: 30000.00}
      ]);
    });
};
