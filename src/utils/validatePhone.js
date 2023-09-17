function validateEthiopianPhoneNumber(phoneNumber) {
    var pattern = /^(\+251)(9|7)([0-9]{8})$/;
    return pattern.test(phoneNumber);
  }
  

  module.exports=  validateEthiopianPhoneNumber;