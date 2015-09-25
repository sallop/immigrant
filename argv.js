var cheerio = require('cheerio'),
	fs = require('fs'),
	path = require('path'),
	Entities = require('html-entities').XmlEntities;

var source = process.argv[2] || 'foo.html',
	prefix = 'ex_',
	output = path.dirname( source ) + '/' + prefix + path.basename( source );

console.log( source );
console.log( output );
