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

const addRegionData = (request, response) => {
  // GEORGE
  // 404
  // validate adequate request inputs, status 422 (unprocessable entity) if inadequate
  // insert new data for a regionType
  // status 201 if successful, return id
  // status 500 if unsuccessful
};

const updateRegionData = (request, response) => {
  // GEORGE
  // 404
  // validate adequate request inputs, status 422 (unprocessable entity) if inadequate
  //   >> id & whichever field they're updating??
  // modify all the data
  // status 204 if successful
  // status 500 if unsuccessful
};

const updateSpecificRegionData = (request, response) => {
  // LINDSAY
  // 404
  // validate adequate request inputs, status 422 (unprocessable entity) if inadequate
  //   >> id & whichever field they're updating?? at least one??
  // modify specific data
  // status 204 if successful
  // status 500 if unsuccessful
};

const deleteRegionData = (request, response) => {
  // LINDSAY
  // 404
  // delete all region data
  // status 200 if successful
  // status 500 if unsuccessful
};

const deleteSpecificRegionData = (request, response) => {
  // GEORGE
  // 404
  // delete specific data
  // status 200 if successful
  // status 500 if unsuccessful
};


module.exports = {
  getRegionData,
  getSpecificRegionData,
  addRegionData,
  updateRegionData,
  updateSpecificRegionData,
  deleteRegionData,
  deleteSpecificRegionData,
};
