const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

const users = require("./user");
const produk = require("./produk");
const kategori = require("./kategori");
const pemasok = require("./pemasok");
const { checkRequest, requiredRequest } = require("../utils");

router.post(
  "/users/login",
  //checkRequest(requiredRequest.admin_login),
  authController.login
);

router.use("/users", users);
router.use("/produk", produk);
router.use("/kategori", kategori);
router.use("/pemasok", pemasok);

module.exports = router;
