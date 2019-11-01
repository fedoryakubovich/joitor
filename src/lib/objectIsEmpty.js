const objectIsEmpty = (obj) =>
  Object.entries(obj).length === 0 && obj.constructor === Object;

module.exports = objectIsEmpty;
