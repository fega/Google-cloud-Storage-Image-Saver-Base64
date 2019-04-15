'use strict';
const validate = require('./validate')
const { save, saveMiniatures } = require('./util')
const config = require('./config')

const BAD_REQUEST = 400;

exports.base = async (req, res) => {
  const error = validate(req.body);

  if (error) return res.status(BAD_REQUEST).send({ error })

  const { image, name } = req.body

  const [saved, miniatures] = await Promise.all([
    await save(config, image, name || 'image'),
    await saveMiniatures(config, image, name || 'image')
  ])

  res.send({
    ...saved,
    miniatures
  })
};