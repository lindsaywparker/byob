const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

const getRegionData = (request, response) => {
  const { regionType } = request.params;

  db(regionType).select()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      if (err.code === '42P01') {
        response.status(404).json({ err: 'Table not found' });
      }
      response.status(500).json(err);
    });
};

const getSpecificRegionData = (request, response) => {
  const { id, regionType } = request.params;

  db(regionType).where('id', id).select()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      if (err.code === '42P01') {
        response.status(404).json({ err: 'Table not found' });
      }
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
  const { regionType, id } = request.params;
  const updates = request.body;

  db(regionType).where('id', id).update(updates)
    .then((result) => {
      response.status(200).json({ result });
    })
    .catch((err) => {
      if (err.code === '42P01') {
        response.status(404).json({ err: 'Table not found' });
      }
      response.status(500).json({ err });
    });
};

const deleteRegionData = (request, response) => {
  const { regionType } = request.params;

  db(regionType).del()
    .then((result) => {
      response.status(200).json({ result });
    })
    .catch((err) => {
      if (err.code === '42P01') {
        response.status(404).json({ err: 'Table not found' });
      }
      response.status(500).json({ err });
    });
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
