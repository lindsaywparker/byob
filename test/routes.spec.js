const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => done());
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => done());
  });

  describe('GET /v1/:regionType', () => {
    it(':) should return all entries for specified region type', (done) => {
      // GEORGE
      chai.request(server)
        .get('/api/v1/state')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });

    it.skip(':) should return filtered entries for region type with provided query parameters', (done) => {
      // LINDSAY
      chai.request(server)
        .get('/api/v1/city?state=NY')
        .end((err, response) => {
          // test all the things!
          // also test if query parameters don't match anything, a la Juan.
          done();
        });
    });

    it.skip(':( should return an error message for unprocessable region types', (done) => {
      // GEORGE
      chai.request(server)
        .get('/api/v1/country')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });
  });

  describe('POST /v1/:regionType', () => {
    // GEORGE
    it.skip(':) should add an entry to the zipcode table', (done) => {
      chai.request(server)
        .post('/api/v1/zipcode')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });

    it.skip(':) should add an entry to the neighborhood table', (done) => {
      chai.request(server)
        .post('/api/v1/neighborhood')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });

    it.skip(':( should not add an entry to the specified table if missing required parameters', (done) => {
      chai.request(server)
        .post('/api/v1/neighborhood')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });

    it.skip(':( should return a clear error message if associated region does not exist in the database', (done) => {
      chai.request(server)
        .post('/api/v1/neighborhood')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });
  });

  describe('PUT /v1/:regionType', () => {
    // LINDSAY
    it.skip(':) should update all matching provided entries in the associated region table', (done) => {
      chai.request(server)
        .put('/api/v1/neighborhood')
        .end((err, response) => {
          // test all the things!
          // should skip over unmatched entries
          done();
        });
    });

    it.skip(':( should return a clear error message if entry is unprocessable', (done) => {
      chai.request(server)
        .put('/api/v1/neighborhood')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });
  });

  describe('PUT /v1/:regionType/:id', () => {
    // LINDSAY
    it.skip(':) should update single matching entry in region table', (done) => {
      chai.request(server)
        .put('/api/v1/neighborhood/1')
        .end((err, response) => {
          // test all the things!
          // mayyyyyy....require hardcoding ids.
          done();
        });
    });

    it.skip(':( should return a clear error message if entry is unprocessable', (done) => {
      chai.request(server)
        .put('/api/v1/neighborhood/1')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });
  });

  describe('DELETE /v1/:regionType', () => {
    // GEORGE
    it.skip(':) should delete all entries in a region table', (done) => {
      chai.request(server)
        .delete('/api/v1/neighborhood')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });

    it.skip(':( should return a clear error message if entry is unprocessable', (done) => {
      chai.request(server)
        .delete('/api/v1/neighborhoods')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });
  });

  describe('DELETE /v1/:regionType/:id', () => {
    // LINDSAY
    it.skip(':) should delete a single entry in a region table', (done) => {
      chai.request(server)
        .delete('/api/v1/neighborhood/1')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });

    it.skip(':( should return a clear error message if entry is unprocessable', (done) => {
      chai.request(server)
        .delete('/api/v1/neighborhood/100')
        .end((err, response) => {
          // test all the things!
          done();
        });
    });
  });
});

