const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

const helpers = require('./helpers/getIds');

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
  const { regionType } = request.params;
  if (regionType === 'zipcode' || regionType === 'neighborhood') {
    db('city').where('name', request.body.city).select()
      .then((data) => {
        const cityId = data[0].id;
        const metroId = data[0].metro_id;
        const stateId = data[0].state_id;
        return db('zipcode').insert(Object.assign(request.body, {
          city_id: cityId,
          metro_id: metroId,
          state_id: stateId,
        }), '*')
          .then(result => response.status(201).json({ result }))
          .catch(err => response.status(500).json({ err }));
      })
      .catch((err) => {
        if (err.code === '42P01') {
          response.status(404).json({ err: 'Table not found' });
        }
        response.status(500).json({ err });
      });
  } else {
    response.status(405).json({ err: 'Unacceptable POST target' });
  }
};

const updateRegionData = (request, response) => {
  const regionType = request.params.regionType;
  helpers.getAllRegionData(db, regionType)
    .then(result => Promise.all(result.map((region, i) => {
      const newData = request.body.data.find(element => element.name === result[i].name);
      if (newData) {
        return db(regionType).where('id', result[i].id).update(newData, '*');
      }
    }))
      .then(results => response.status(200).json({ results }))
      .catch(err => response.status(500).json({ err })))
    .catch((err) => {
      if (err.code === '42P01') {
        response.status(404).json({ err: 'Table not found' });
      }
      response.status(500).json({ err });
    });
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
  db(request.params.id).where('id', request.params.id).del()
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      if (err.code === '42P01') {
        response.status(404).json({ err: 'Table not found' });
      }
      response.status(500).json({ err });
    });
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
