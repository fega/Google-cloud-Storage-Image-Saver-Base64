module.exports = {
  // allowed file format extensions
  allowedExtensions: ['png', 'jpg', 'gif', 'webp', 'gif', 'svg'],

  // google cloud bucket name
  bucket: 'bucket-name',

  // Resize options (Only when image size is larger)
  resize: {
    width: 800,
    height: 800,
    fit: 'inside',
  },

  // Use this to save it in a different format (set as false or comment to disable it)
  outputFormat: 'jpeg',

  // Sharp Output Options http://sharp.pixelplumbing.com/en/stable/api-output/#jpeg
  outputOptions: {
    quality: 80,
    progressive: true,
  },
  /**
   * Set the save file name
   * @param {string} or original name
   * @param {string} ext file extension
   * @param {string} tt timestamp
   */
  name: (or, ext, tt) => `${or}-${tt}.${ext}`,
  /**
   * Set the save path
   * @param {string} or original name
   * @param {string} ext file extension
   * @param {string} tt timestamp
   */
  path: (or, ext, tt) => '/images/',

  // Array of miniatures to be generated (Optional) 
  miniatures: [{
    resize: {
      width: 100,
      height: 100,
      fit: 'cover',
    },
    outputFormat: 'jpeg',
    outputOptions: {
      quality: 80,
      progressive: true,
    },
    name: (or, ext, tt) => `${or}-${tt}-100.${ext}`,
    path: (or, ext, tt) => '/miniatures/'
  }],
}