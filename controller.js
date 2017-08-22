const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

const getRegionData = (request, response) => {
  const regionType = request.params.regionType;
  const tableList = ['state', 'metro', 'city', 'neighborhood', 'zipcode'];
  if (tableList.indexOf(regionType) < 0) {
    response.status(404).json({ error: 'Table not found' });
  }
  db(regionType).select()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      response.status(500).json(err);
    });
};

const getSpecificRegionData = (request, response) => {
  const id = request.params.id;
  const regionType = request.params.regionType;
  const tableList = ['state', 'metro', 'city', 'neighborhood', 'zipcode'];
  if (tableList.indexOf(regionType) < 0) {
    response.status(404).json({ error: 'Table not found' });
  }
  db(regionType).where('id', id).select()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      response.status(500).json(err);
    });
};

module.exports = {
  getRegionData,
  getSpecificRegionData,
};
