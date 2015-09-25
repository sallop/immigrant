var cheerio = require('cheerio'),
	//jsdom = require('node-jsdom'),
	jsdom = require('jsdom'),
	//$ = require('jquery'),
	fs = require('fs'),
	path = require('path'),
	Entities = require('html-entities').XmlEntities;

var source = process.argv[2] || './bible.html',
	suffix = '.lst',
	odir = path.join(__dirname, './extracted_attachments') ||
		path.join(__dirname, path.dirname( source )),
	output = odir + '/' + path.basename( source, '.html' ) + suffix;

console.log( source );
console.log( output );

jsdom.env({
	file: source,
//scripts: [ 'http://code.jquery.com/jquery-1.5.min.js' ],
scripts: [ '/usr/lib/node_modules/jquery/dist/jquery.js' ],
done: function ( errors, window ){
	var $ = window.$;
//var template =;

	// slice( start, end )
	// substring( start, end )
	// substr( start, length )
	var bg_img = $('body').css('background-image');
	var start = "url\\(", end = "\\)";
	var data = bg_img.slice( bg_img.search(start) + start.length - 1, bg_img.search(end));
	fs.appendFile(output, data + "\n", { encoding: 'utf8' }, function(err){
		if (err){ throw err; }
		console.log('The "data to append" was appended to file!');
	});
	$('img').each(function(){
		var data = path.basename(this.src);
		fs.appendFile(output, data + "\n", { encoding: 'utf8' }, function(err){
			if (err){ throw err;}
			console.log('The "data to append" was appended to file!');
		});
	});
}});
