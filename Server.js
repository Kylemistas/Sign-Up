//Modules
var http = require('http');
//var dt = require('./myfirstmodule');
//var url = require('url');
var fs = require('fs');
var formidable = require('formidable');
//Create Server Object
//req argument represents the request from the client, as an aobject
//http.createServer(function (req, res ){
	
	//http Header
//	res.writeHead(200, {'Content-Type': 'text/html'});

//	res.end('Hello World!');
//	res.write('The date and time are currently: ' + dt.myDateTime());	
	//"url" holds the part of the url that comes after domain
//	res.write(req.url);

//Split the query string into readable parts
//	var q = url.parse(req.url,true).query;
//	var txt = q.year + " " + q.month + " " + q.day;
//	res.end(txt);//end the reponse

http.createServer(function (req, res){
	if (req.url == '/fileupload'){
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files){
			var oldpath = files.fileupload.filepath;
			var newpath = 'uploads/' + files.fileupload.originalFilename;
			var filename = '"' + files.fileupload.originalFilename + '"';
			//var location = '"Documents/Projects/FirstProjects/uploads"';
			var fname = "First Name: "+ fields.firstname.toString() + "\n";
			var lname = "Last Name: "+ fields.lastname.toString() + "\n";
			var ems = "Email: "+ fields.email.toString() + "\n";
			var cons = "Contact: "+ fields.contact.toString() + "\n";
			var profilename = 'Profile Name: "'+ files.fileupload.originalFilename + '"\n\n';
			var data = fname + lname + ems + cons + profilename;
			//
		 	fs.appendFile('DataSaver.csv',data,function(err){
				if(err){
					console.log(err);
				}
			});

			fs.readFile('success.html', function(err, data){
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
				return res.end();
			});
		
			fs.appendFile('mynewfile.csv','\n',function(err) {
				if (err) throw err;
				console.log('Saved!');
			});
			
			fs.rename(oldpath, newpath, function (err){
				if (err) throw err;
			//	res.write('File-uploaded and Moved, check it out!');
				// res.write(filename + ' has been uploaded to ' + location);
				// res.end();
			}) 
		})
	} 
	else {
		fs.readFile('index.html', function(err, data){
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		});
	}
}).listen(8080); // the server objects listen on port 8080
