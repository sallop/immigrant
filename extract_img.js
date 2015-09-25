var cheerio = require('cheerio'),
	fs = require('fs'),
	path = require('path'),
	Entities = require('html-entities').XmlEntities;

var source = process.argv[2] || './bible.html',
	prefix = 'ex_',
	odir = './extracted' || path.dirname( source ),
	output = odir + '/' + prefix + path.basename( source );

console.log( source );
console.log( output );

process.argv.forEach( function(val, index, array) {
	console.log( index + ': ' + val);
});

var $ = cheerio.load(fs.readFileSync( source ));
$('img').each( function( i, element ){
	//console.log("i="+i);
	//console.log("element="+element);
	for(var key in element){
		console.log(key + "=" + element[key]);
	}
});

//var entities = new Entities();
//var decoded = entities.decode( $('body').html() );
//console.log( decoded ); 
//console.log( entities.decode( decoded ));
//console.log( entities.decode( $.html()) );
//fs.writeFile( output, decoded );
