var cheerio = require('cheerio'),
	fs = require('fs'),
	path = require('path'),
	Entities = require('html-entities').XmlEntities;
	//Entities = require('html-entities').AllHtmlEntities;

var source = process.argv[2] || './ex_bible.html',
	prefix = 'ex_',
	odir = './extracted' || path.dirname( source ),
	output = odir + '/' + prefix + path.basename( source );

console.log( source );
//console.log( output );

// process.argv.forEach( function(val, index, array) {
// 	console.log( index + ': ' + val);
// });
//console.log( process.argv );
var $ = cheerio.load(fs.readFileSync( source ));

$('*').each( function(){
	var backImg;
	if ($(this).is('img')){
		console.log($(this).attr('src'));
	} else {
		backImg = $(this).css('background-image');
		if ( backImg && backImg != 'none'){
			//console.log(backImg.substring(4, backImg.length - 1));
			console.log(backImg);
		}
	}
});

//var entities = new Entities();
//var decoded = entities.decode( $('body').html() );
//console.log( decoded ); 
//console.log( entities.decode( decoded ));
//console.log( entities.decode( $.html()) );

//fs.writeFile( output, decoded );
