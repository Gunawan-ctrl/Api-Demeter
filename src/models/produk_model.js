const mongoose = require("mongoose");
const path = require("path");
var scriptName = path.basename(__filename);
const colname = scriptName.split("_");
const collectionName = colname[0];

const Schema = new mongoose.Schema(
  {
    GUID: {
      type: String,
    },
    ID_BARANG: {
      type: String
    },
    NAMA: {
      type: String,
    },
    KATEGORI: {
      type: String,
    },
    SATUAN: {
      type: String,
    },
    MODAL: {
      type: Number,
    },
    JUAL: {
      type: Number,
    },
    STOK: {
      type: Number,
    },
    JENIS_PENJUALAN: {
      type: String,
    },
    GARANSI: {
      NAMA: {
        type: String,
      },
      JENIS: {
        type: String,
      }
    },
    UKURAN: {
      BERAT: {
        type: Number,
      },
      PANJANG: {
        type: Number,
      },
      LEBAR: {
        type: Number,
      },
      TINGGI: {
        type: Number,
      }
    },
    DIKIRIM: {
      type: String,
    },
    IMAGE: Object,
    DESKRIPSI: {
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
