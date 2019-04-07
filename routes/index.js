
/*
 * GET home page.
 */

exports.view = async function(req, res){

  // const vision = require('@google-cloud/vision');
  //
  // // Creates a client
  // const client = new vision.ImageAnnotatorClient();
  //
  // // Performs label detection on the image file
  // client
  //   .labelDetection('gao.png')
  //   .then(results => {
  //     const labels = results[0].labelAnnotations;
  //
  //     console.log('Labels:');
  //     labels.forEach(label => console.log(label.description));
  //   })
  //   .catch(err => {
  //     console.error('ERROR:', err);
  //   });

  // Imports the Google Cloud client libraries
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
  const fileName = '2.jpg';

  // Performs text detection on the gcs file
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  console.log('Text:');
  console.log(detections)
  // for each ( in detections) {
  //   console.log()
  // }
  // detections.forEach(text => console.log(text['description']));

  res.render('index');
};

exports.webcam = function(req, res){
	res.render('webcam');
};
