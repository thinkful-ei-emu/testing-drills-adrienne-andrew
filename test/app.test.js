const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');

// GET / test
describe('GET /', () => {
  it('GET / should return a message', () => {
    return request(app)
      .get('/')
      .expect(200, 'Hello Express!');
  });
});


// GET /sum test
describe('GET /sum', () => {
  it('8/4 should be 2', () => {
    return request(app)
      .get('/sum')
      .query({ a: 8, b: 4 })
      .expect(200, '8 divided by 4 is 2');
  });

  it('should return 400 if a is missing', () => {
    return request(app)
      .get('/sum')
      .query({ b: 4 })
      .expect(400, 'Value for a is needed');
  });
});


// GET /frequency test
describe('GET /frequency', () => {
  it('empty string should return 400', () => {
    return request(app)
      .get('/frequency')
      .query({ s: '' })
      .expect(400, 'Invalid Request');
  });

  it('should return 400 if given no query', () => {
    return request(app)
      .get('/frequency')
      .query({})
      .expect(400, 'Invalid Request');
  });

  it('should return the frequency of occurrence of each character in the String, the total number of distinct characters, the average frequency, and the character with the highest frequency', () => {
    return request(app)
      .get('/frequency')
      .query({ s: 'aaBBAAbbaa' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.all.keys(
          'unique', 'average', 'highest', 'a', 'b'
        )
        expect(res.body).to.eql({
          unique: 2,
          average: 5,
          highest: 'a',
          'a': 6,
          'b': 4
        })
      })
  });
});