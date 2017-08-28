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
          response.status.should.equal(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(20);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('collected_on');
          response.body[0].should.have.property('median_rent');
          response.body[0].should.have.property('monthly_change');
          response.body[0].should.have.property('quarterly_change');
          response.body[0].should.have.property('yearly_change');
          response.body[0].should.have.property('size_rank');
          response.body[0].should.have.property('created_at');
          response.body[0].should.have.property('updated_at');
          response.body[0].should.have.property('abbr');
          response.body[0].id.should.equal(1);
          response.body[0].name.should.equal('California');
          response.body[0].median_rent.should.equal(2438);
          response.body[0].size_rank.should.equal(1);
          response.body[0].abbr.should.equal('CA');
          response.body[19].should.have.property('id');
          response.body[19].should.have.property('name');
          response.body[19].should.have.property('collected_on');
          response.body[19].should.have.property('median_rent');
          response.body[19].should.have.property('monthly_change');
          response.body[19].should.have.property('quarterly_change');
          response.body[19].should.have.property('yearly_change');
          response.body[19].should.have.property('size_rank');
          response.body[19].should.have.property('created_at');
          response.body[19].should.have.property('updated_at');
          response.body[19].should.have.property('abbr');
          response.body[19].id.should.equal(20);
          response.body[19].name.should.equal('Wisconsin');
          response.body[19].median_rent.should.equal(1160);
          response.body[19].size_rank.should.equal(20);
          response.body[19].abbr.should.equal('WI');
          done();
        });
    });

    it(':) should return filtered entries for region type with provided query parameters', (done) => {
      // LINDSAY
      chai.request(server)
        .get('/api/v1/city?state=NY')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('metro_id');
          response.body[0].should.have.property('state_id');
          response.body[0].should.have.property('collected_on');
          response.body[0].should.have.property('median_rent');
          response.body[0].should.have.property('monthly_change');
          response.body[0].should.have.property('quarterly_change');
          response.body[0].should.have.property('yearly_change');
          response.body[0].should.have.property('size_rank');
          response.body[0].should.have.property('state');
          response.body[0].should.have.property('metro');
          response.body[0].should.have.property('county');
          response.body[0].should.have.property('created_at');
          response.body[0].should.have.property('updated_at');
          response.body[0].name.should.equal('New York');
          response.body[1].name.should.equal('Yonkers');
          response.body[0].state.should.equal('NY');
          response.body[1].state.should.equal('NY');
          done();
        });
    });

    it(':) should return no entries if the provided query parameters do not match any records', (done) => {
      // LINDSAY
      chai.request(server)
        .get('/api/v1/city?state=XX')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
          done();
        });
    });

    it(':( should return an error message for unprocessable region types', (done) => {
      // GEORGE
      chai.request(server)
        .get('/api/v1/country')
        .end((err, response) => {
          response.status.should.equal(404);
          response.should.be.json;
          response.body.err.should.equal('Table not found');
          done();
        });
    });
  });

  describe('POST /v1/:regionType', () => {
    it(':) should add an entry to the zipcode table', (done) => {
      const newZip = {
        id: 6,
        name: 12345,
        metro_id: 5,
        state_id: 6,
        city_id: 4,
        collected_on: '2017-06-30',
        median_rent: 500,
        monthly_change: 10.10,
        quarterly_change: 99.99,
        yearly_change: 1.21,
        size_rank: 999,
        state: 'PA',
        metro: 'Philadelphia',
        county: 'Camden',
        city: 'Philadelphia',
      };

      chai.request(server)
        .post('/api/v1/zipcode')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnQHR1cmluZy5pbyIsImFwcE5hbWUiOiJzaWxseSBiZXRzIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwMzg2MDI3MX0.fj1nrVab5HRe1_YFHL9zVWZ80rR8Hvi358G-c9yo56c')
        .send(newZip)
        .end((err, response) => {
          response.status.should.equal(201);
          response.should.be.json;
          response.body.result.should.be.a('array');
          response.body.result.length.should.equal(1);
          response.body.result[0].should.have.property('id');
          response.body.result[0].should.have.property('name');
          response.body.result[0].should.have.property('metro_id');
          response.body.result[0].should.have.property('city_id');
          response.body.result[0].should.have.property('state_id');
          response.body.result[0].should.have.property('collected_on');
          response.body.result[0].should.have.property('median_rent');
          response.body.result[0].should.have.property('monthly_change');
          response.body.result[0].should.have.property('quarterly_change');
          response.body.result[0].should.have.property('yearly_change');
          response.body.result[0].should.have.property('size_rank');
          response.body.result[0].should.have.property('state');
          response.body.result[0].should.have.property('metro');
          response.body.result[0].should.have.property('county');
          response.body.result[0].should.have.property('city');
          response.body.result[0].should.have.property('created_at');
          response.body.result[0].should.have.property('updated_at');

          response.body.result[0].id.should.equal(6);
          response.body.result[0].name.should.equal('12345');
          response.body.result[0].metro_id.should.equal(5);
          response.body.result[0].state_id.should.equal(6);
          response.body.result[0].city_id.should.equal(4);
          response.body.result[0].collected_on.should.equal('2017-06-30T06:00:00.000Z');
          response.body.result[0].median_rent.should.equal(500);
          response.body.result[0].monthly_change.should.equal('10.10');
          response.body.result[0].quarterly_change.should.equal('99.99');
          response.body.result[0].yearly_change.should.equal('1.21');
          response.body.result[0].size_rank.should.equal(999);
          response.body.result[0].state.should.equal('PA');
          response.body.result[0].metro.should.equal('Philadelphia');
          response.body.result[0].county.should.equal('Camden');
          response.body.result[0].city.should.equal('Philadelphia');
          chai.request(server)
            .get('/api/v1/zipcode')
            .end((err2, response2) => {
              response2.body.length.should.equal(6);
              response2.body[5].name.should.equal('12345');
              done();
            });
        });
    });

    it(':) should add an entry to the neighborhood table', (done) => {
      const newNeighb = {
        id: 6,
        name: 'Illadelphia',
        metro_id: 5,
        state_id: 6,
        city_id: 4,
        collected_on: '2017-06-30',
        median_rent: 500,
        monthly_change: 10.10,
        quarterly_change: 99.99,
        yearly_change: 1.21,
        size_rank: 999,
        state: 'PA',
        metro: 'Philadelphia',
        county: 'Camden',
        city: 'Philadelphia',
      };
      chai.request(server)
        .post('/api/v1/neighborhood')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnQHR1cmluZy5pbyIsImFwcE5hbWUiOiJzaWxseSBiZXRzIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwMzg2MDI3MX0.fj1nrVab5HRe1_YFHL9zVWZ80rR8Hvi358G-c9yo56c')
        .send(newNeighb)
        .end((err, response) => {
          response.status.should.equal(201);
          response.should.be.json;
          response.body.result.should.be.a('array');
          response.body.result.length.should.equal(1);
          response.body.result[0].should.have.property('id');
          response.body.result[0].should.have.property('name');
          response.body.result[0].should.have.property('metro_id');
          response.body.result[0].should.have.property('city_id');
          response.body.result[0].should.have.property('state_id');
          response.body.result[0].should.have.property('collected_on');
          response.body.result[0].should.have.property('median_rent');
          response.body.result[0].should.have.property('monthly_change');
          response.body.result[0].should.have.property('quarterly_change');
          response.body.result[0].should.have.property('yearly_change');
          response.body.result[0].should.have.property('size_rank');
          response.body.result[0].should.have.property('state');
          response.body.result[0].should.have.property('metro');
          response.body.result[0].should.have.property('county');
          response.body.result[0].should.have.property('city');
          response.body.result[0].should.have.property('created_at');
          response.body.result[0].should.have.property('updated_at');

          response.body.result[0].id.should.equal(6);
          response.body.result[0].name.should.equal('Illadelphia');
          response.body.result[0].metro_id.should.equal(5);
          response.body.result[0].state_id.should.equal(6);
          response.body.result[0].city_id.should.equal(4);
          response.body.result[0].collected_on.should.equal('2017-06-30T06:00:00.000Z');
          response.body.result[0].median_rent.should.equal(500);
          response.body.result[0].monthly_change.should.equal('10.10');
          response.body.result[0].quarterly_change.should.equal('99.99');
          response.body.result[0].yearly_change.should.equal('1.21');
          response.body.result[0].size_rank.should.equal(999);
          response.body.result[0].state.should.equal('PA');
          response.body.result[0].metro.should.equal('Philadelphia');
          response.body.result[0].county.should.equal('Camden');
          response.body.result[0].city.should.equal('Philadelphia');
          chai.request(server)
            .get('/api/v1/neighborhood')
            .end((err2, response2) => {
              response2.body.length.should.equal(6);
              response2.body[5].name.should.equal('Illadelphia');
              done();
            });
        });
    });

    it(':( should not add an entry to the specified table if missing required parameters', (done) => {
      const newNeighb = {
        id: 6,
        name: 'Illadelphia',
        metro_id: 5,
        state_id: 6,
        city_id: 4,
        city: 'Philadelphia',
      };

      chai.request(server)
        .post('/api/v1/neighborhood')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnQHR1cmluZy5pbyIsImFwcE5hbWUiOiJzaWxseSBiZXRzIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwMzg2MDI3MX0.fj1nrVab5HRe1_YFHL9zVWZ80rR8Hvi358G-c9yo56c')
        .send(newNeighb)
        .end((err, response) => {
          response.body.err.code.should.equal('23502');
          done();
        });
    });

    it(':( should return a clear error message if associated region does not exist in the database', (done) => {
      const newZip = {
        id: 6,
        name: 12345,
        metro_id: 5,
        state_id: 6,
        city_id: 4,
        collected_on: '2017-06-30',
        median_rent: 500,
        monthly_change: 10.10,
        quarterly_change: 99.99,
        yearly_change: 1.21,
        size_rank: 999,
        state: 'PA',
        metro: 'Philadelphia',
        county: 'Camden',
        city: 'Philadelphia',
      };

      chai.request(server)
        .post('/api/v1/state')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnQHR1cmluZy5pbyIsImFwcE5hbWUiOiJzaWxseSBiZXRzIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwMzg2MDI3MX0.fj1nrVab5HRe1_YFHL9zVWZ80rR8Hvi358G-c9yo56c')
        .send(newZip)
        .end((err, response) => {
          response.body.err.should.equal('Unacceptable POST target');
          done();
        });
    });

    it(':( must have authorization to post', (done) => {
      chai.request(server)
        .post('/api/v1/zipcode')
        .end((err, response) => {
          response.body.err.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it(':( must have authorization to post', (done) => {
      chai.request(server)
        .post('/api/v1/zipcode')
        .set('Authorization', 'this should not work')
        .end((err, response) => {
          response.body.err.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });
  });

  describe('PUT /v1/:regionType', () => {
    // LINDSAY
    it(':) should update single matching entry in region table', (done) => {
      const update = {
        median_rent: 2999,
        size_rank: 2,
      };
      chai.request(server)
        .put('/api/v1/neighborhood/1')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnQHR1cmluZy5pbyIsImFwcE5hbWUiOiJzaWxseSBiZXRzIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwMzg2MDI3MX0.fj1nrVab5HRe1_YFHL9zVWZ80rR8Hvi358G-c9yo56c')
        .send(update)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('result');
          response.body.result.should.equal(1);
          chai.request(server)
            .get('/api/v1/neighborhood?name=Upper+West+Side')
            .end((err, response) => {
              response.body[0].should.have.property('id');
              response.body[0].should.have.property('name');
              response.body[0].should.have.property('metro_id');
              response.body[0].should.have.property('state_id');
              response.body[0].should.have.property('city_id');
              response.body[0].should.have.property('collected_on');
              response.body[0].should.have.property('median_rent');
              response.body[0].should.have.property('monthly_change');
              response.body[0].should.have.property('quarterly_change');
              response.body[0].should.have.property('yearly_change');
              response.body[0].should.have.property('size_rank');
              response.body[0].should.have.property('state');
              response.body[0].should.have.property('metro');
              response.body[0].should.have.property('county');
              response.body[0].should.have.property('city');
              response.body[0].should.have.property('created_at');
              response.body[0].should.have.property('updated_at');
              response.body[0].id.should.equal(1);
              response.body[0].name.should.equal('Upper West Side');
              response.body[0].metro_id.should.equal(1);
              response.body[0].state_id.should.equal(3);
              response.body[0].city_id.should.equal(1);
              response.body[0].median_rent.should.equal(2999);
              response.body[0].size_rank.should.equal(2);
              response.body[0].state.should.equal('NY');
              response.body[0].metro.should.equal('New York');
              response.body[0].county.should.equal('New York');
              response.body[0].city.should.equal('New York');
              done();
            });
        });
    });

    it(':( should return a clear error message if associated region does not exist in the database', (done) => {
      const badUpdate = {
        BADKEYmedian_rent: 2999,
        size_rank: 2,
      };

      chai.request(server)
        .put('/api/v1/neighborhood/1')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnQHR1cmluZy5pbyIsImFwcE5hbWUiOiJzaWxseSBiZXRzIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwMzg2MDI3MX0.fj1nrVab5HRe1_YFHL9zVWZ80rR8Hvi358G-c9yo56c')
        .send(badUpdate)
        .end((err, response) => {
          response.body.err.code.should.equal('42703');
          done();
        });
    });

    // it(':( must have authorization to post', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/zipcode')
    //     .end((err, response) => {
    //       response.body.err.should.equal('You must be authorized to hit this endpoint');
    //       done();
    //     });
    // });
    // 
    // it(':( must have authorization to post', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/zipcode')
    //     .set('Authorization', 'this should not work')
    //     .end((err, response) => {
    //       response.body.err.should.equal('You must be authorized to hit this endpoint');
    //       done();
    //     });
    // });
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
    it(':) should delete all entries in a region table', (done) => {
      chai.request(server)
        .get('/api/v1/zipcode')
        .end((err, response) => {
          response.body.length.should.equal(5);
          chai.request(server)
            .delete('/api/v1/zipcode')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnQHR1cmluZy5pbyIsImFwcE5hbWUiOiJzaWxseSBiZXRzIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwMzg2MDI3MX0.fj1nrVab5HRe1_YFHL9zVWZ80rR8Hvi358G-c9yo56c')
            .end((error2, response2) => {
              response2.body.result.should.equal(5);
              chai.request(server)
                .get('/api/v1/zipcode')
                .end((err3, response3) => {
                  response3.body.length.should.equal(0);
                  done();
                });
            });
        });
    });

    it(':( should return a clear error message if entry is unprocessable', (done) => {
      chai.request(server)
        .delete('/api/v1/metro')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnQHR1cmluZy5pbyIsImFwcE5hbWUiOiJzaWxseSBiZXRzIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwMzg2MDI3MX0.fj1nrVab5HRe1_YFHL9zVWZ80rR8Hvi358G-c9yo56c')
        .end((err, response) => {
          response.body.err.code.should.equal('23503');
          response.body.err.should.have.property('detail');
          done();
        });
    });

    it(':( must have authorization to delete', (done) => {
      chai.request(server)
        .delete('/api/v1/zipcode')
        .end((err, response) => {
          response.body.err.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it(':( must have authorization to delete', (done) => {
      chai.request(server)
        .delete('/api/v1/zipcode')
        .set('Authorization', 'this should not work')
        .end((err, response) => {
          response.body.err.should.equal('You must be authorized to hit this endpoint');
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
