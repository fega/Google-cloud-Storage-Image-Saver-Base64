const config = require('./config')
const util = require('./util')


const isBase64 = str => str.match(util.base64Regex);
const isAllowedExtension = (str) => config.allowedExtensions.includes(str)

module.exports = (body) => {
  if (!body.image) return '"body.image" not provided'

  if (!isBase64(body.image)) return '"body.image" is not a base64 string'

  if (!isAllowedExtension(body.image)) return '"body.image" doesn\'t have an allowed extension'
}