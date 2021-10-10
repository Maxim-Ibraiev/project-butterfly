const fs = require('fs').promises
const multer = require('multer')
const { uploadDir, storeImage } = require('../../../config/globalConst.js')

const isAccessible = path => fs
    .access(path)
    .then(() => true)
    .catch(() => false)

const createFolderIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}

createFolderIsNotExist(uploadDir)
createFolderIsNotExist(storeImage)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
})

const upload = multer({
  storage,
})

module.exports = upload
