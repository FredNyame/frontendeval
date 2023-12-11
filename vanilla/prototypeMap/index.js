// Goal is to implement the functionality of the Array.prototype.map

Array.prototype.customMap = function (callback) {
  const currentValues = this;
  const returnValues = [];

  for (let index = 0; index < currentValues.length; index++) {
    callback(currentValues[index], index);
  }

  return returnValues;
};

const values = [1, 2, 3, 4];
const newValues = values.customMap((data, index) => {
  console.log(`Index: ${index} data:${data}`);
});
