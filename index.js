'use strict';
const image = require('./test/base-64')
const validate = require('./validate')
const { save, saveMiniatures } = require('./util')
const config = require('./config')

const BAD_REQUEST = 400;

exports.base = async (req, res) => {
  const error = validate(req.body);

  if (error) return res.status(BAD_REQUEST).send({ error })

  const [saved, miniatures] = await Promise.all([
    await save(config, image, req.body.name || 'image'),
    await saveMiniatures(config, image, req.body.name || 'image')
  ])

  res.send({
    ...saved,
    miniatures
  })
};