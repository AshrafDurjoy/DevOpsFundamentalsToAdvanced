const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const expect = chai.expect;
const { configureDynamoDBForTesting } = require('./test-setup');

// Configure chai
chai.use(chaiHttp);

// Before running tests
before(() => {
  // Configure DynamoDB mock for testing
  if (process.env.NODE_ENV === 'test') {
    configureDynamoDBForTesting();
  }
});

// After all tests
after(() => {
  // Restore all sinon stubs
  sinon.restore();
});

describe('Solar System App', function() {
  let app;
  
  before(function() {
    // Import app after DynamoDB has been configured
    app = require('./app');
  });
  
  describe('GET /', function() {
    it('should return the home page', function(done) {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('GET /api/planets', function() {
    it('should return all planets', function(done) {
      chai.request(app)
        .get('/api/planets')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.at.least(1);
          done();
        });
    });
  });

  describe('GET /api/planets/:id', function() {
    it('should return a specific planet', function(done) {
      chai.request(app)
        .get('/api/planets/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('id').equal(1);
          done();
        });
    });

    it('should return 404 for non-existent planet', function(done) {
      chai.request(app)
        .get('/api/planets/999')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});