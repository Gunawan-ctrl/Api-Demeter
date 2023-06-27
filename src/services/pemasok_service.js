const bcrypt = require("bcrypt");
var path = require("path");
var scriptName = path.basename(__filename);
const filename = scriptName.split("_");
let model = require("../models/" + filename[0] + "_model");
const { requestResponse } = require("../utils");
const create = async (data) => {
  await model.create(data);

  return { ...requestResponse.success, data: model };
};
const get = async (condition) => {
  return model.find(condition, { _id: false }, { lean: true });
};
const getById = async (condition) => {
  return user_model.findOne(condition, { _id: false }, { lean: true });
};

const updateOne = async (condition, body) => {
  return model.updateOne(condition, body);
};

const deleteOne = async (condition) => {
  return model.deleteOne(condition);
};

const getCount = async (condition) => {
  return model.find(condition, { _id: false }, { lean: true }).count();
};

module.exports = {
  create,
  get,
  getById,
  updateOne,
  deleteOne,
  getCount,
};
