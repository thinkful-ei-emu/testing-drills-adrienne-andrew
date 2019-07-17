const { expect, should, assert } = require('chai');

const { sort } = require('../index');

describe('sort function', () => {
  it('should return an array that is sorted in ascending order', () => {
    const arr1 = [1,5,4];
    const arr2 = [1,4,5];
    expect(sort(arr1)).to.eql(arr2);
  });

  it('should be an array of only integers', () => {
    const arr = [1,2,3];
    sort(arr).forEach(element => {
      expect(element).to.be.a('number');
    });
  });

  it('should return an empty arrray if provided an empty array', () => {
    const arr = [];
    expect(sort(arr)).to.be.an('array').that.is.empty;
  }); 
});