var cheerio = require('cheerio'),
	fs = require('fs'),
	path = require('path'),
	Entities = require('html-entities').XmlEntities;

var source = process.argv[2] || './bible.html',
	suffix = '.html',
	odir = './extracted_body' || path.dirname( source ),
	output = odir + '/' + path.basename( source ).replace('replaced', 'extracted');

console.log( source );
console.log( output );

var $ = cheerio.load(fs.readFileSync( source ));

var data = $('body').html();
var entities = new Entities();
var decoded = entities.decode( data );
console.log( decoded ); 
fs.writeFile( output, decoded );
