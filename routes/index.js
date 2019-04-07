
/*
 * GET home page.
 */

exports.view = function(req, res){

  res.render('index');
};

exports.webcam = function(req, res){
	res.render('webcam');
};

exports.download = function(req, res){
	res.download('out.csv');
};

exports.gen_text = async function(req, res){

    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const fileName = 'user_text.jpg';

    // Performs text detection on the gcs file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    console.log(detections)
}
