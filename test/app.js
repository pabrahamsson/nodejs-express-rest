process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('App', () => {
  describe('GET /', function () {
    it('it should GET the message + paths', function (done) {
      chai.request(server)
        .get('/')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.message.should.be.a('string').eql('This is my webservice!');
          res.body.paths.should.be.a('array').eql([ '/', '/greeting', '/hostinfo' ]);
          done();
        });
    });
  });
  describe('GET /greeting', function () {
    it('it should GET default greeting', function (done) {
      chai.request(server)
        .get('/greeting')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.id.should.be.a('number').eql(1);
          res.body.content.should.be.a('string').eql('Hello, World!');
          done();
        });
    });
  });
  describe('GET /greeting/:name', function () {
    it('it should GET greeting with given name', function (done) {
      chai.request(server)
        .get('/greeting/OpenShift')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.id.should.be.a('number').eql(2);
          res.body.content.should.be.a('string').eql('Hello, OpenShift!');
          done();
        });
    });
  });
  describe('GET /greeting?name', function () {
    it('it should GET greeting with given name', function (done) {
      chai.request(server)
        .get('/greeting?name=OpenShift')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.id.should.be.a('number').eql(3);
          res.body.content.should.be.a('string').eql('Hello, OpenShift!');
          done();
        });
    });
  });
  describe('GET /hostinfo', function () {
    it('it should GET the hostname', function (done) {
      chai.request(server)
        .get('/hostinfo')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.hostname.should.be.a('string').eql(process.env.HOSTNAME);
          done();
        });
    });
  });
  describe('GET /health', function () {
    it('it should GET the /health endpoint', function (done) {
      chai.request(server)
        .get('/health')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.hostname.should.be.a('string').eql(process.env.HOSTNAME);
          res.body.memoryUsage.should.be.an('object');
          done();
        });
    });
  });
});
