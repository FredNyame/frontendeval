// Goal is to implement the functionality of the Array.prototype.map

Array.prototype.customMap = (callback) => {
  const currentValues = this;
  const returnValues = [];

  for (let index = 0; index < currentValues.length; index++) {
    callback(currentValues[i], index);
  }

  return returnValues;
};
