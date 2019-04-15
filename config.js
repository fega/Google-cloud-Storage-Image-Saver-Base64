module.exports = {
  allowedExtensions: ['png', 'jpg', 'gif', 'webp', 'gif', 'svg'],
  bucket: 'bucket-name',
  resize: {
    width: 800,
    height: 800,
    fit: 'inside',
  },
  outputFormat: 'jpeg',
  outputOptions: {
    quality: 80,
    progressive: true,
  },
  /**
   * Set the name
   * @param {string} or original name
   * @param {string} ext file extension
   * @param {string} tt timestamp
   */
  name: (or, ext, tt) => `${or}-${tt}.${ext}`,
  path: (or, ext, tt) => '/images/',

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