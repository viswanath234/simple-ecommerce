const apiError = (status, message, errors = null) => {
  return {
    success: false,
    status,
    message,
    errors,
  };
};

module.exports = { apiError };
