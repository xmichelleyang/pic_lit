
/*
 * GET home page.
 */

exports.view = function(req, res){
  // // Imports the Google Cloud client library
  // const vision = require('@google-cloud/vision');
  //
  // // Creates a client
  // const client = new vision.ImageAnnotatorClient();
  //
  // // Performs label detection on the image file
  // const [result] = await client.labelDetection('gao.png');
  // const labels = result.labelAnnotations;
  // console.log('Labels:');
  // labels.forEach(label => console.log(label.description));

  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  client
    .labelDetection('gao.png')
    .then(results => {
      const labels = results[0].labelAnnotations;

      console.log('Labels:');
      labels.forEach(label => console.log(label.description));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });


  // // Imports the Google Cloud client library.
  // const {Storage} = require('@google-cloud/storage');
  //
  // // Instantiates a client. If you don't specify credentials when constructing
  // // the client, the client library will look for credentials in the
  // // environment.
  // const storage = new Storage();
  //
  // // Makes an authenticated API request.
  // storage
  //   .getBuckets()
  //   .then((results) => {
  //     const buckets = results[0];
  //
  //     console.log('Buckets:');
  //     buckets.forEach((bucket) => {
  //       console.log(bucket.name);
  //     });
  //   })
  //   .catch((err) => {
  //     console.error('ERROR:', err);
  //   });


  res.render('index');
};

// exports.compute = async function quickstart(req, res) {
//   // Imports the Google Cloud client library
//   const vision = require('@google-cloud/vision');
//
//   // Creates a client
//   const client = new vision.ImageAnnotatorClient();
//
//   // Performs label detection on the image file
//   const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
//   const labels = result.labelAnnotations;
//   console.log('Labels:');
//   labels.forEach(label => console.log(label.description));
//
//
// };
