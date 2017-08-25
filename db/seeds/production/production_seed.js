const states = require('../../../helpers/raw-data/states');
const metros = require('../../../helpers/raw-data/metros');
const cities = require('../../../helpers/raw-data/cities');
const neighborhoods = require('../../../helpers/raw-data/neighborhoods');
const zipcodes = require('../../../helpers/raw-data/zipcodes');

exports.seed = function (knex, Promise) {
  return knex('neighborhood').del()
    .then(() => knex('zipcode').del())
    .then(() => knex('city').del())
    .then(() => knex('metro').del())
    .then(() => knex('state').del())
    .then(() => knex('state').insert(states, '*'))
    .then(data => knex('metro').insert(
      metros.map((metro) => {
        metro.state_id = data.find(state => state.abbr === metro.state).id;
        return metro;
      }), '*'))
    .then(data => knex('city').insert(
      cities.map((city) => {
        city.state_id = data.find(metro => metro.name === `${city.metro}, ${city.state}`).state_id;
        city.metro_id = data.find(metro => metro.name === `${city.metro}, ${city.state}`).id;
        return city;
      }), '*'))
    .then(data => Promise.all([
      knex('neighborhood').insert(
        neighborhoods.map((neighborhood) => {
          neighborhood.state_id = data.find(city => city.name === neighborhood.city).state_id;
          neighborhood.metro_id = data.find(city => city.name === neighborhood.city).metro_id;
          neighborhood.city_id = data.find(city => city.name === neighborhood.city).id;
          return neighborhood;
        })),
      knex('zipcode').insert(
        zipcodes.map((zipcode) => {
          zipcode.state_id = data.find(city => city.name === zipcode.city).state_id;
          zipcode.metro_id = data.find(city => city.name === zipcode.city).metro_id;
          zipcode.city_id = data.find(city => city.name === zipcode.city).id;
          return zipcode;
        })),
    ]));
};
