
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index');
};

exports.webcam = function(req, res){
	res.render('webcam');
};

exports.image = function(req, res){
	const fs = require('fs');
  var base64result =  req.body.imgBase64.split(',')[1];
  console.log(base64result);
  const atob = require('atob');
  const dec = atob(base64result);
	fs.writeFile('user_text.png', dec, "binary", function(err){
		if (err) throw err
			console.log('File saved.')
	});
  res.send(200);
};

exports.download = function(req, res){
	res.download('out.csv');
};

exports.download_screen = async function(req, res){
  console.log("About to convert to google OCR");
  // Writing CSV file
  const fs = require('fs');

  // Imports the Google Cloud client libraries
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  const fileName = 'user_text.png';

  // Performs text detection on the gcs file
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  console.log('Text:');

  // Get String
  let results_str = result.textAnnotations[0]['description'];

  // Convert string to array
  let results_arr = results_str.split('\n');
  console.log(results_arr);

  // Convert array to an object
  let result_obj = [];
  for (i = 0; i < results_arr.length; i++) {
    if (i % 2 == 0){
      if (results_arr[i] != ""){
        result_obj[results_arr[i]] = results_arr[i+1];
      }
    }
  }

  // Convert array to csv manually
  let result_csv = "";
  for (i = 0; i < results_arr.length; i++) {
    if (i % 2 == 0){
      result_csv += results_arr[i] + '\t'
    }
    else {
      result_csv += results_arr[i] + '\n'
    }
  }

  console.log("result csv", result_csv);

  fs.writeFile("out.csv", result_csv, (err) => {
	  if (err) {
	      console.error(err);
				res.send(400);
	      return;
	  };
	  console.log("File has been created in", __dirname);
	});

  res.render('download');
};

async function gen_text(){


}
