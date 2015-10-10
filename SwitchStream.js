#!/usr/bin/node

var fs = require('fs');
//var path = "./bible.html";
var path = "./replaced.sh";

var rstream = fs.createReadStream( path, {
	flags: 'r',
	encoding: 'utf8',
	fd: null,
	mode: 0666,
	//umask: 0000,
	autoClose: true
});

var wstream = fs.createWriteStream( './bible2.html', {
	flags: 'w',
	encoding: 'utf8',
	//mode: 0644,
	mode: 0666
});

rstream
.pipe(process.stdout)
.on('finish', function(){
	console.log('done to read');
});

rstream
.pipe(wstream);

