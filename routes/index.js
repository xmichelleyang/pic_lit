
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

exports.return_to_home = function(req, res){
	res.render('index');
};
exports.download_screen = function(req, res){
	res.render('download');
};

exports.gen_text = async function(req, res){
  // Writing CSV file
  const fs = require('fs');

  // Imports the Google Cloud client libraries
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  const fileName = 'user_text.jpg';

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

}
