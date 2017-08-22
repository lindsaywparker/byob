const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

const getRegionData = (request, response) => {
  const regionType = request.params.regionType;
  db(regionType).select()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      response.status(500).json(err);
    });
};

module.exports = {
  getRegionData,
};
