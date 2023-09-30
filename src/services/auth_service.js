require("dotenv").config();
const model = require("../models/user_model");
const { requestResponse } = require("../utils");
const { listRole } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { readFileSync } = require("fs");
const privateKey = readFileSync("./private.key", "utf-8");

let response;
const login = async ({ USERNAME, PASSWORD }) => {
  const user = await model.findOne(
    { USERNAME: USERNAME },
    { _id: false },
    { lean: true }
  );
  if (user === null) {
    response = { ...requestResponse.unauthorized };
    response.message = "user tidak ditemukan.";
    return response;
  }

  const comparePassword = await bcrypt.compare(PASSWORD, user.PASSWORD);
  if (!comparePassword) {
    response = { ...requestResponse.unauthorized };
    response.message = "Password anda salah.";
    return response;
  }
  const token = jwt.sign(
    {
      guid: user.guid,
      ...(user.ID && { ID: user.ID }),
      ...(user.EMAIL && { EMAIL: user.EMAIL }),
      ...(user.USERNAME && { USERNAME: user.USERNAME }),
      ...(user.PASSWORD && { PASSWORD: user.PASSWORD }),
      ...(user.ROLE && { ROLE: user.ROLE }),
    },
    privateKey,
    {
      algorithm: "RS256",
    },
    {
      expiresIn: "7d",
    }
  );
  // console.log()

  const result = {
    ...requestResponse.success,
    data: {
      user,
      token,
    },
  };
  return result;
};

const login2 = async ({ username, password }) => {
  // console.log(password);
  const user = await model.findOne(
    { username: username },
    { _id: false },
    { lean: true }
  );
  // console.log(user)
  if (user === null) {
    response = { ...requestResponse.unauthorized };
    return response;
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  // console.log(comparePassword);
  if (!comparePassword) {
    return { ...requestResponse.authorized_failed };
  }
  const token = jwt.sign(
    {
      guid: user.guid,
      ...(user.no_telpon && { no_telpon: user.no_telpon }),
      ...(user.instansi_code && { instansi_code: user.instansi_code }),
      ...(user.app_code && { app_code: user.app_code }),
      ...(user.email && { email: user.email }),
      ...(user.password && { password: user.password }),
      ...(user.role && { role: user.role }),
    },
    privateKey,
    {
      algorithm: "RS256",
    },
    {
      expiresIn: "7d",
    }
  );
  // console.log()

  const result = {
    ...requestResponse.success,
    data: {
      user,
      token,
    },
  };
  return result;
};

module.exports = {
  login,
  login2,
};
