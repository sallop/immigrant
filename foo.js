var fs = require('fs'),
	path = require('path');

var source = process.argv[2] || './bible.html',
	suffix = '.html',
	odir = path.join(__dirname, './extracted_attachments') ||
		path.join(__dirname, path.dirname( source )),
	output = odir + '/' + path.basename( source );

console.log( source );
console.log( output );

fs.appendFile( output, output, function(err) {
	if (err) throw err;
	console.log('The "data to append" was appended to file!');
});

//fs.open( output, "w+", function(err, fd){
//	var buf = new Buffer( output );
//	//var buf = "This is just a string object";
//	//console.log( output );
//	// fs.write(fd, data, position, encoding, callback)
//	///fs.write(fd, buf, 0, buf.length, null, function(err, written, string){
//	////fs.write(fd, buf, 0, buf.length, 'utf8', function(err, written, string){
//	//	if (err) {
//	//		throw err;
//	//	}
//	//	console.log(err, written, string);
//	//	fs.close(fd, function(){
//	//		console.log('Done');
//	//	});
//
//	//});
//});

