const mongoose = require("mongoose");
const path = require("path");
var scriptName = path.basename(__filename);
const colname = scriptName.split("_");
const collectionName = colname[0];
const moment = require("moment");
let date = moment().format("YYYY-MM-D");
const Schema = new mongoose.Schema(
  {
    GUID: {
      type: String
    },
    ID: {
      type: String
    },
    NAMA: {
      type: String
    },
    USERNAME: {
      type: String
    },
    PASSWORD: {
      type: String
    },
    EMAIL: {
      type: String
    },
    TELEPON: {
      type: String
    },
    ALAMAT: {
      type: String
    },
    KECAMATAN: {
      type: String
    },
    KABUPATEN: {
      type: String
    },
    PROVINSI: {
      type: String
    },
    TOKO: {
      type: String
    },
    ALAMAT_TOKO: {
      type: String
    },
    LOGO_TOKO: {
      type: String
    },
    ROLE: {
      type: Number
    },
    CREATED_AT: {
      type: Date,
      default: () => new Date()
    },
    UPDATED_AT: {
      type: Date,
      default: () => new Date()
    }
  },
  {
    versionKey: false,
    collection: collectionName
  });

module.exports = mongoose.model(collectionName, Schema);
