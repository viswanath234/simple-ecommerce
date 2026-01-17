const apiResponse = (status, data, message) => {
  return {
    success: true,
    status,
    data,
    message,
  };
};

module.exports = { apiResponse };
