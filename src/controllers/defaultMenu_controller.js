require("dotenv").config();
var path = require("path");
var scriptName = path.basename(__filename);
const filename = scriptName.split("_");
const service = require("../services/" + filename[0] + "_service");
const logger = require("../utils/logger");
const { requestResponse } = require("../utils");
const { v4 } = require("uuid");
let response;

const create = async (req, res) => {
  try {
    req.body.GUID = v4();
    const data = await service.create(req.body);
    response = { ...data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const get = async (req, res) => {
  try {
    const data = await service.get();
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const getById = async (req, res) => {
  try {
    const data = await service.getById({ GUID: req.params.guid });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const updateOne = async (req, res) => {
  try {
    req.body.UPDATED_AT = new Date();
    const data = await service.updateOne({ GUID: req.params.guid }, req.body);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const deleteOne = async (req, res) => {
  try {
    console.log(req.params)
    const data = await service.deleteOne({ GUID: req.params.guid });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const getCount = async (req, res) => {
  try {
    req.body.guid = v4();
    const data = await service.getCount();
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

module.exports = {
  create,
  get,
  getById,
  updateOne,
  deleteOne,
  getCount
};