const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.toString().length !== 4) {
    return helpers.message('password must be 4 characters');
  }
  if (!value.toString().match(/\d/)) {
    return helpers.message('password must only contain numbers');
  }
  return value;
};

const phoneNumber = (value, helpers) => {
  const pattern = /^(\+251)(9|7)([0-9]{8})$/;
  if (!pattern.test(value)) {
    return helpers.message('Phone number must be a valid number');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  phoneNumber,
};
