
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');

var path = require('path');
var handlebars = require('express3-handlebars');
//var fileUpload = require('express-fileupload');
var multer = require('multer');
var bodyParser = require('body-parser');
var morgan = require('morgan');
const vision = require('@google-cloud/vision');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./");
	},
	filename: (req, file, cb) => {
		cb(null, "user_text.png")
	}
});
const upload = multer({storage: storage});

var index = require('./routes/index');
// Example route
//var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/webcam', index.webcam);
app.get('/download', index.download);
app.post('/uploadfile', upload.single('myFile'), (req, res) => {
	if(req.file){
		console.log('Uploading');
		var filename = req.file.filename;
		var uploadStatus = 'file upload success';
		const fs = require('fs');
		const atob = require('atob');
//  const dec = atob(base64result);
		console.log(typeof req.file);
    res.redirect("download-screen");
	} else{
		console.log('failed');
		var filename = 'file not uploaded';
		var uploadStatus = 'file failed';
	}
});
app.get('/download-screen', index.download_screen);
// app.get('/gen_text', index.gen_text);
app.post('/image', index.image);
// Example route
// app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
