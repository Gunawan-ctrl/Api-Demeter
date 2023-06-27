const authService = require("../services/auth_service");
const { requestResponse } = require("../utils");
const logger = require("../utils/logger");

let response;

const login = async (req, res) => {
  let loginResponse;
  try {
    const { USERNAME, PASSWORD } = req.body;
    loginResponse = await authService.login({ USERNAME, PASSWORD });
    response = { ...loginResponse };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }

  res.status(response.code).json(response);
};


module.exports = {
  login,
};
