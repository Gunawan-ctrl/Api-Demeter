require("dotenv").config();
var path = require("path");
var scriptName = path.basename(__filename);
const filename = scriptName.split("_");
const service = require("../services/" + filename[0] + "_service");
const logger = require("../utils/logger");
const { requestResponse } = require("../utils");
const { v4 } = require("uuid");
const fileService = require("../services/file_service");
const Promise = require("bluebird");
const formidable = Promise.promisifyAll(require("formidable"), {
  multiArgs: true,
});
const form = formidable();
let response;
// const create = async (req, res) => {
//   try {
//     const [fields, files] = await form.parseAsync(req);
//     fields.GUID = v4();
//     req.body.GARANSI = { NAMA: req.body.GARANSI, JENIS: req.body.JENIS_GARANSI }
//     req.body.GUID = v4();
//     console.log(req.body)
//     // const data = await service.create(req.body);
//     response = { ...data };
//   } catch (error) {
//     logger.error(error);
//     response = { ...requestResponse.server_error };
//   }
//   res.json(response);
// };

const create = async (req, res) => {
  try {
    const [fields, files] = await form.parseAsync(req);
    fields.GUID = v4();
    fields.GARANSI = { NAMA: fields.GARANSI, JENIS: fields.JENIS_GARANSI }
    fields.UKURAN = { BERAT: fields.BERAT, PANJANG: fields.PANJANG, TINGGI: fields.TINGGI, LEBAR: fields.TINGGI }
    let IMAGE1, IMAGE2, IMAGE3, IMAGE4;
    // let fileName = null
    const dateNow = ~~(new Date() / 1000);
    let fileName = {}
    // console.log(files)
    if (files.IMAGE1 != undefined) {
      IMAGE1 = `IMAGE1${files.IMAGE1.newFilename}--${dateNow}-${fields.NAMA}.${fileService.getFileExtension(files.IMAGE1.originalFilename)}`;
      const oldPath = files.IMAGE1.filepath;
      const newPath = `${process.env.IMAGE_PATH}/${IMAGE1}`;
      await fileService.moveFile(oldPath, newPath);
      fileName.IMAGE1 = IMAGE1
    } if (files.IMAGE2 != undefined) {
      IMAGE2 = `IMAGE2${files.IMAGE2.newFilename}--${dateNow}-${fields.NAMA}.${fileService.getFileExtension(files.IMAGE2.originalFilename)}`;
      const oldPath = files.IMAGE2.filepath;
      const newPath = `${process.env.IMAGE_PATH}/${IMAGE2}`;
      await fileService.moveFile(oldPath, newPath);
      fileName.IMAGE2 = IMAGE2
    } if (files.IMAGE3 != undefined) {
      IMAGE3 = `IMAGE3${files.IMAGE3.newFilename}--${dateNow}-${fields.NAMA}.${fileService.getFileExtension(files.IMAGE3.originalFilename)}`;
      const oldPath = files.IMAGE3.filepath;
      const newPath = `${process.env.IMAGE_PATH}/${IMAGE3}`;
      await fileService.moveFile(oldPath, newPath);
      fileName.IMAGE3 = IMAGE3
    } if (files.IMAGE4 != undefined) {
      IMAGE4 = `IMAGE4${files.IMAGE4.newFilename}--${dateNow}-${fields.NAMA}.${fileService.getFileExtension(files.IMAGE4.originalFilename)}`;
      const oldPath = files.IMAGE4.filepath;
      const newPath = `${process.env.IMAGE_PATH}/${IMAGE4}`;
      await fileService.moveFile(oldPath, newPath);
      fileName.IMAGE4 = IMAGE4
    }

    fields.IMAGE = fileName;
    console.log(fields.IMAGE)

    const data = await service.create(fields);
    response = { ...data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const get = async (_req, res) => {
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
    const [fields, files] = await form.parseAsync(req);
    fields.GUID = req.params.guid
    fields.GARANSI = { NAMA: fields.GARANSI, JENIS: fields.JENIS_GARANSI }
    fields.UKURAN = { BERAT: fields.BERAT, PANJANG: fields.PANJANG, TINGGI: fields.TINGGI, LEBAR: fields.TINGGI }
    let IMAGE1, IMAGE2, IMAGE3, IMAGE4;
    // let fileName = null
    const dateNow = ~~(new Date() / 1000);
    let fileName = {}
    console.log(files)
    if (files.IMAGE1 != undefined) {
      IMAGE1 = `IMAGE1${files.IMAGE1.newFilename}--${dateNow}-${fields.NAMA}.${fileService.getFileExtension(files.IMAGE1.originalFilename)}`;
      const oldPath = files.IMAGE1.filepath;
      const newPath = `${process.env.IMAGE_PATH}/${IMAGE1}`;
      await fileService.moveFile(oldPath, newPath);
      fileName.IMAGE1 = IMAGE1
    } if (files.IMAGE2 != undefined) {
      IMAGE2 = `IMAGE2${files.IMAGE2.newFilename}--${dateNow}-${fields.NAMA}.${fileService.getFileExtension(files.IMAGE2.originalFilename)}`;
      const oldPath = files.IMAGE2.filepath;
      const newPath = `${process.env.IMAGE_PATH}/${IMAGE2}`;
      await fileService.moveFile(oldPath, newPath);
      fileName.IMAGE2 = IMAGE2
    } if (files.IMAGE3 != undefined) {
      IMAGE3 = `IMAGE3${files.IMAGE3.newFilename}--${dateNow}-${fields.NAMA}.${fileService.getFileExtension(files.IMAGE3.originalFilename)}`;
      const oldPath = files.IMAGE3.filepath;
      const newPath = `${process.env.IMAGE_PATH}/${IMAGE3}`;
      await fileService.moveFile(oldPath, newPath);
      fileName.IMAGE3 = IMAGE3
    } if (files.IMAGE4 != undefined) {
      IMAGE4 = `IMAGE4${files.IMAGE4.newFilename}--${dateNow}-${fields.NAMA}.${fileService.getFileExtension(files.IMAGE4.originalFilename)}`;
      const oldPath = files.IMAGE4.filepath;
      const newPath = `${process.env.IMAGE_PATH}/${IMAGE4}`;
      await fileService.moveFile(oldPath, newPath);
      fileName.IMAGE4 = IMAGE4
    }

    fields.IMAGE = fileName;
    const data = await service.updateOne({ GUID: req.params.guid }, fields);
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