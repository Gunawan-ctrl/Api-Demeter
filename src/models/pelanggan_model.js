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
      type: String,
    },
    ID_PELANGGAN: {
      type: String,
    },
    NAMA: {
      type: String,
    },
    TELEPON: {
      type: String,
    },
    EMAIL: {
      type: String,
    },
    ALAMAT: {
      type: String,
    },
    KECAMATAN: {
      type: String,
    },
    KABUPATEN: {
      type: String,
    },
    PROVINSI: {
      type: String,
    },
    PROFIL: {
      type: String,
    },
    CREATED_AT: {
      type: Date,
      default: () => new Date(),
    },
    UPDATED_AT: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    versionKey: false,
    collection: collectionName,
  }
);

module.exports = mongoose.model(collectionName, Schema);
