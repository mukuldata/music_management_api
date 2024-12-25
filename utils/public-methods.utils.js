const responseHandler = (res, statusCode, data, message, error) => {
  return res.status(statusCode).json({
    status: statusCode,
    data: data || null,
    message: message || '',
    error: error || null,
  });
};


module.exports = {
  responseHandler
}