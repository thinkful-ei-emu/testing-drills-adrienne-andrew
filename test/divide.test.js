const { expect } = require('chai');

const { divide } = require('../index');

describe('divide function', () => {
  
  it('should divide positive integers correctly', () => {
    expect(divide(10, 5)).to.equal(2);
  });

  it('should throw an error when divided by 0', () => {
    expect(() => divide(10, 0)).to.throw();
  });
  
});