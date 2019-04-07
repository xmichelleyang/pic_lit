
/*
 * GET home page.
 */

exports.view = function(req, res){

  res.render('index');
};

exports.webcam = function(req, res){

	res.render('webcam');
};

exports.gen_text = async function(req, res){
  // Import array to CSV library
  const { convertArrayToCSV } = require('convert-array-to-csv');
  const converter = require('convert-array-to-csv');

  // Writing CSV file
  const fastcsv = require('fast-csv');
  const fs = require('fs');
  const ws = fs.createWriteStream("out.csv");

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
  console.log(result_obj);
  // const csvFromArrayOfObjects = convertArrayToCSV(result_obj);
  //
  // console.log(csvFromArrayOfObjects);
  //

  fastcsv.write(result_obj).pipe(ws);

  // let csvContent = "data:text/csv;charset=utf-8,";

  // results_arr.forEach(function(rowArray){
  //    let row = rowArray.join("\t,");
  //    csvContent += row + "\r\n";
  // });
  //
  // var encodedUri = encodeURI(csvContent);
  // window.open(encodedUri);
  // console.log(csvContent);

  // Put terms into two separate arrays
  // let terms = [];
  // let definitions = [];
  // for (i = 0; i < results_arr.length; i++) {
  //   if (i % 2 == 0){
  //     terms.append(results_arr[i]);
  //   }
  //   else {
  //     definitions.append(results_arr[i]);
  //   }
  // }
}
