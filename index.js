const express = require('express');
const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.route('/')
  .get((req, res) => {
    db('cars')
      .then(r => {
        console.log(r);
        if(r) res.status(200).json(r);
        else res.status(400).json({ error: 'Could not retrieve the list of cars' });
      })
      .catch(e => {
        console.error(e.response);
        res.status(500).json({ errorMessage: 'Request could not be completed' });
      });
  })
  .post((req, res) => {
    let car = req.body;
    if(!car.VIN || !car.make || !car.model || !car.mileage) res.status(400).json({ error: 'You must include VIN, make, model and mileage' });
    else db('cars').insert(car)
      .then(r => {
        console.log(r);
        if(r.length) res.status(201).json({ message: 'Car successfully inserted', car_id: r[0] });
        else res.status(400).json({ error: 'Could not insert car' });
      })
      .catch(e => {
        console.error(e.response);
        res.status(500).json({ errorMessage: 'The request could not be completed' });
      });
  });

app.get('/:id', (req, res) => {
  let id = req.params.id;
  db('cars').where({ id })
    .then(r => {
      console.log(r);
      if(r) res.status(200).json(r);
      else res.status(404).json({ error: 'Could not find the requested resource' });
    })
    .catch(e => {
      console.error(e.response);
      res.status(500).json({ errorMessage: 'The request could not be completed' });
    });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});