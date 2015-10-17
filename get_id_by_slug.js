#!/usr/bin/node
var spawn = require('child_process').spawn,
	exec = require('child_process').exec;

var fs = require('fs'),
	path = require('path');

// read slug list by WordPress
var buf = fs.readFileSync('all_image.txt', 'utf8');
//var buf = fs.readFileSync('all_wav.txt', 'utf8');
//var buf = fs.readFileSync('all_pdf.txt', 'utf8');
//var buf = fs.readFileSync('slug_ID_URI.txt', 'utf8');
// wp eval-file get_id_by_slug.php $line


console.log( buf );
var lines = buf.split(/\n/);
for(var i in lines){
	var record = lines[i].split(/\t/); 
	var slug = record[0],
		id = record[1],
		url = record[2];
	if ( slug !== "" ){
		console.log( "slug: " + slug );

		var command = ['wp', 'eval-file', 'get_id_by_slug.php', slug].join(' ');
		console.log( command );	

		exec( command, function( error, stdout, stderr ){
			process.stdout.write( stdout );
			if ( error !== null ){
				console.log( error );
			}
		});
	}
}

