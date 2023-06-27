const mongoose = require("mongoose");
const path = require("path");
var scriptName = path.basename(__filename);
const colname = scriptName.split("_");
const collectionName = colname[0];
const Schema = new mongoose.Schema(
  {
    GUID: {
      type: Number,
    },
    NAMA: {
      type: String,
    },
    CREATED_AT: {
      type: Date,
      default: new Date(),
    },
    UPDATED_AT: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
    collection: collectionName,
  }
);

module.exports = mongoose.model(collectionName, Schema);
