# Google cloud function image Store

This is a basic boilerplate for a Node.js service that can store images in google cloud function from image-64 strings.

## Features

- Uses Sharp (AKA, very fast);
- Miniature generation support
- Serverless Framework support
- Max Sizing support
- No more Service Scale pains!

## Usage

1. Clone this repository
2. Change the config.js File (Check the comments in that file)
3. Change the serverless.yml config file
4. Deploy an enjoy

## Response example

```javascript
{
  "height": 68,
  "width": 61,
  "size": 2404,
  "format": "jpeg",
  "url": "https://www.googleapis.com/download/storage/v1/b/test-bucket-fega01/o/images%2Fimage-5fec83f0-5f7c-11e9-b15e-450ad8a47371.jpeg?generation=1555332340580861&alt=media",
  "md5Hash": "iPfi/I/YVE1cgWlXoD9etg==",
  "contentType": "image/jpeg",
  "miniatures": [
    {
      "height": 68,
      "width": 61,
      "size": 2404,
      "format": "jpeg",
      "url": "https://www.googleapis.com/download/storage/v1/b/test-bucket-fega01/o/miniatures%2Fimage-6048d4c0-5f7c-11e9-b15e-450ad8a47371-100.jpeg?generation=1555332341014935&alt=media",
      "md5Hash": "iPfi/I/YVE1cgWlXoD9etg==",
      "contentType": "image/jpeg"
    }
  ]
}
```

## License

MIT