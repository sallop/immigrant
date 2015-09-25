var cheerio = require('cheerio'),
	fs = require('fs'),
	path = require('path'),
	Entities = require('html-entities').XmlEntities;
	//Entities = require('html-entities').AllHtmlEntities;

var source = process.argv[2] || './bible.html',
	//prefix = 'ex_',
	suffix = '.css',
	odir = './extracted_style' || path.dirname( source ),
	output = odir + '/' + path.basename( source, '.html' ) + suffix;

console.log( source );
console.log( output );

process.argv.forEach( function(val, index, array) {
	console.log( index + ': ' + val);
});
//console.log( process.argv );
var $ = cheerio.load(fs.readFileSync( source ));
// $('body').each( function( i, element ){
// });

var entities = new Entities();
var decoded = entities.decode( $('style').html() );
console.log( decoded ); 
console.log( entities.decode( decoded ));
//console.log( entities.decode( $.html()) );

fs.writeFile( output, decoded );
