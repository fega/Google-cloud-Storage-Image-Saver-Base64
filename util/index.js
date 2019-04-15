const Sharp = require('sharp')
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const uuid = require('uuid/v1');

const storage = new Storage();
/** Base 64 regex */
const base64Regex = /^data:image\/([a-z]+);base64,/;

const shouldResize = (resizeConfig, metadata) => {
  if (!resizeConfig) return false;
  if (!resizeConfig.height && !resizeConfig.width) return false
  return (resizeConfig.height < metadata.height || resizeConfig.width < metadata.width)
}

/**
 * get a buffer from a base 64 string
 * @param {string} str image base64 string
 */
const getImageBuffer = (str) => Buffer.from(str.replace(base64Regex, ''), 'base64');

/**
 * Gets image metadata
 * @param {Buffer} buffer Image buffer
 */
const getMetadata = (buffer) => new Promise((resolve, reject) => {
  Sharp(buffer)
    .metadata()
    .then(resolve)
    .catch(reject)
})

/**
 * Process image resizing it and formatting it
 * @param {object} config config object
 * @param {Buffer} buffer image buffer
 */
const processImage = (config, buffer) => new Promise(async (resolve, reject) => {
  const image = Sharp(buffer)

  const metadata = await getMetadata(buffer)

  const resized = shouldResize(config.resize, metadata)
    ? image.resize(config.resize)
    : image

  const formated = config.outputFormat
    ? resized[config.outputFormat](config.outputOptions)
    : resized

  formated.toBuffer()
    .then(resolve)
    .catch(err => reject(err))
})

/**
 * Saves an image in google cloud
 * @param {Object} config config object
 * @param {Buffer} buffer Image buffer
 * @param {string} format Image
 * @param {string} name Image Name 
 */
const saveImage = async (config, buffer, format, name) => {

  const timestamp = uuid()

  const filePath = path
    .join(
      config.path(name, format, timestamp),
      config.name(name, format, timestamp),
    );
  const bucket = storage
    .bucket(config.bucket)

  const file = bucket
    .file(filePath)

  return file
    .save(buffer, { contentType: `image/${format}` })
    .then(() => file.getMetadata())
}

/**
 * Saves the object tho the Bucket
 * @param {Object} config config object
 * @param {string} str Image string
 */
const save = async (config, str, name) => {
  const buffer = getImageBuffer(str);
  const image = await processImage(config, buffer);
  const { height, width, size, format } = await getMetadata(image);
  const saveInfo = await saveImage(config, image, format, name)

  return {
    height,
    width,
    size,
    format,
    url: saveInfo[0].mediaLink,
    md5Hash: saveInfo[0].md5Hash,
    contentType: saveInfo[0].contentType,
  }
}

const saveMiniatures = async (config, str, name) => {
  if (!config.miniatures) return null
  const promises = config.miniatures
    .map(miniature => save({
      path: config.path,
      name: config.name,
      bucket: config.bucket,
      ...miniature
    }, str, name))
  return Promise.all(promises)
}

module.exports = {
  processImage,
  getMetadata,
  getImageBuffer,
  save,
  saveMiniatures,
  base64Regex
}