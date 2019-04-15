const test = require('ava').default
const { processImage, getImageBuffer, getMetadata } = require('../util')
const image = require('./base-64')
const { base } = require('../index')

test('getImageBuffer', (t) => {
  const buf = getImageBuffer(image);
  t.true(Buffer.isBuffer(buf))
})

test('processImage(), no image format change', async (t) => {
  const config = {
    resize: {
      width: 10,
      height: 10,
      fit: 'inside'
    }
  }
  const buf = getImageBuffer(image);
  const processed = await processImage({}, buf);
  t.true(Buffer.isBuffer(processed))
})

test('processImage(), image format change', async (t) => {
  const config = {
    resize: {
      width: 10,
      height: 10,
      fit: 'inside',
      formatOutput: 'jpg'
    }
  }
  const buf = getImageBuffer(image);
  const processed = await processImage({}, buf);
  t.true(Buffer.isBuffer(processed))
})

test('getMetadata()', async (t) => {
  const buf = getImageBuffer(image);
  const metadata = await getMetadata(buf);
  t.is(metadata.width, 61)
  t.is(metadata.height, 68)
})

/**
 * REQUEST
 */
test('REQUEST, BAD_REQUEST, body image not provided', async t => {
  let status;
  let body;
  await base({
    body: {}
  }, {
      status: (_status) => {
        status = _status;
        return {
          send: (_body) => {
            body = _body;
          }
        }
      }
    })
  t.is(status, 400)
  t.deepEqual(body, { error: '"body.image" not provided' })
})

test('REQUEST, BAD_REQUEST, image is not base-64', async t => {
  let status;
  let body;
  await base({
    body: { image: 'DFSAADASD' }
  }, {
      status: (_status) => {
        status = _status;
        return {
          send: (_body) => {
            body = _body;
          }
        }
      }
    })
  t.is(status, 400)
  t.deepEqual(body, { error: '"body.image" is not a base64 string' })
})

test('REQUEST, BAD_REQUEST, image is not valid type', async t => {
  let status;
  let body;
  await base({
    body: { image: 'data:image/pdf;base64,R0lGODlhPQBEAPeoAJosM//AwO' }
  }, {
      status: (_status) => {
        status = _status;
        return {
          send: (_body) => {
            body = _body;
          }
        }
      }
    })
  t.is(status, 400)
  t.deepEqual(body, { error: '"body.image" doesn\'t have an allowed extension' })
})

test('REQUEST, OK, valid', async t => {
  let status;
  let body;
  await base({
    body: { image: 'data:image/gif;base64,R0lGODlhPQBEAPeoAJosM//AwO' }
  }, {
      status: (_status) => {
        status = _status;
        return {
          send: (_body) => {
            body = _body;
          }
        }
      }
    })
  t.is(status, 200)
})