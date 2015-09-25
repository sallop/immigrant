var fs = require('fs'),
	path = require('path');

var source = process.argv[2] || './bible.html',
	source = fs.readFileSync( source ),
	prefix = 'replaced_',
	suffix = '.html',
	odir = path.join(__dirname, './replaced') ||
	path.join(__dirname, path.dirname( source )),
	output = odir + '/' + prefix + path.basename( source, '.html' ) + suffix;
var $ = require('jquery');

console.log( source );
console.log( output );
	
var slug_url_list = fs.readFileSync( './slug_ID_URI.txt', { encoding: 'ascii' });

// read file "slug_ID_URI.txt"
// get img tag, and css background image
// search slug from url list
// get absolute url from image name
// replace old url to new one

//var doc = jsdom.jsdom( source, {
//
var jsdom = require('jsdom').jsdom;
var document = jsdom( source, {
	//scripts: [ '/usr/lib/node_modules/jquery/dist/jquery.js' ],
//	done: function (errors, window){
//		var $ = window.$;
//		//console.log( slug_url_list );
//		//var template =;
//		//Array.prototype.foo = "foo is 1024";
//		var arr = slug_url_list.split('\n');
//		var tbl = {};
//
//		//arr = arr.filter( function(n){ return n != undefined || n != ''});
//		arr = arr.filter( function(n){ return  n !== ''; });
//		//console.log( slug_url_list );
//		//console.log( arr );
//		console.log( arr.length );
//		for(var i = 0; i < arr.length; i++){
//			var record = arr[i].split('\t');
//			// file name: record[0]
//			// ID: record[1]
//			// absolute path: record[2]
//			tbl[record[0]] = record[2];
//		}
//		console.log('tbl=' + tbl);
//		for(var key in tbl){
//			console.log(key + "\t" + tbl[key]);
//		}
//
//		//back007.jpg	468	http://www.hakobune.com/wp_taniyama/wp-content/uploads/2015/07/back007.jpg
//		//var template = "http://www.hakobune.com/wp_taniyama/wp-content/uploads/%s/%s/%s";
//		// slice( start, end )
//		// substring( start, end )
//		// substr( start, length )
//		var bg_img = $('body').css('background-image');
//		var start = "url\\(", end = "\\)";
//		var data = bg_img.slice( bg_img.search(start) + start.length - 1, bg_img.search(end));
//		// jpg/back007.jpg
//		data = path.basename( data );
//
//		console.log( data );
//		console.log( tbl[data] );
//
//		$('body').css('background-image', data);
//		$('img').each(function(){
//			//var data = path.basename(this.src);
//			var data = path.basename( $(this).attr("src") );
//			$(this).attr("src", tbl[data]);
//		});

//}
});

var window = document.defaultView;
//var window = document.createWindow();
//var content = window.defaultView;
jsdom.jQueryify(window, "http://code.jquery.com/jquery-2.1.1.js", function (){
	//window.$("body").append('<div class="testing">Hello World, It works</div>');
	//console.log( window.$('body').text());
	//console.log( window.$('html').text());
	console.log( window.$('html').html());
});

function getStyleSheet(){
	for(var i=0; i<document.styleSheets.length; i++){
		//var sheet = document.styleSheets[i];
		//console.log( document.styleSheets[i] );
		console.log("the number of i = " + i );
	}
}

getStyleSheet();
//console.log( content );
//console.log( window );

// jsdom.env({
// 	file: source,
// //scripts: [ 'http://code.jquery.com/jquery-1.5.min.js' ],
// scripts: [ '/usr/lib/node_modules/jquery/dist/jquery.js' ],
// done: function (errors, window){
// 	var $ = window.$;
// 	//console.log( slug_url_list );
// //var template =;
// //Array.prototype.foo = "foo is 1024";
// 	var arr = slug_url_list.split('\n');
// 	var tbl = {};
// 	
// 	//arr = arr.filter( function(n){ return n != undefined || n != ''});
// 	arr = arr.filter( function(n){ return  n != ''});
// 	//console.log( slug_url_list );
// 	//console.log( arr );
// 	console.log( arr.length );
// 	for(var i = 0; i < arr.length; i++){
// 		var record = arr[i].split('\t');
// 		// file name: record[0]
// 		// ID: record[1]
// 		// absolute path: record[2]
// 		tbl[record[0]] = record[2];
// 	}
// 	console.log('tbl=' + tbl);
// 	for(var key in tbl){
// 		console.log(key + "\t" + tbl[key]);
// 	}
// 
// //back007.jpg	468	http://www.hakobune.com/wp_taniyama/wp-content/uploads/2015/07/back007.jpg
// 	//var template = "http://www.hakobune.com/wp_taniyama/wp-content/uploads/%s/%s/%s";
// 	// slice( start, end )
// 	// substring( start, end )
// 	// substr( start, length )
// 	var bg_img = $('body').css('background-image');
// 	var start = "url\\(", end = "\\)";
// 	var data = bg_img.slice( bg_img.search(start) + start.length - 1, bg_img.search(end));
// 	// jpg/back007.jpg
// 	data = path.basename( data );
// 
// 	console.log( data );
// 	console.log( tbl[data] );
// 
// 	$('body').css('background-image', data);
// 
// 	//fs.appendFile(output, data + "\n", { encoding: 'utf8' }, function(err){
// 	//	if (err){ throw err; }
// 	//	console.log('The "data to append" was appended to file!');
// 	//});
// 	$('img').each(function(){
// 		//var data = path.basename(this.src);
// 		var data = path.basename( $(this).attr("src") );
// 		console.log( data );
// 		console.log( tbl[data] );
// 
// 		$(this).attr("src", tbl[data]);
// 
// 		//fs.appendFile(output, data + "\n", { encoding: 'utf8' }, function(err){
// 		//	if (err){ throw err;}
// 		//	console.log('The "data to append" was appended to file!');
// 		//});
// 	});
// 	
// 	//console.log( window.document.documentElement.outerHTML );
// 	//console.log( "done:" + $('body').html() );
// 	//console.log( $('html').html() );
// 	//console.log( $('html')[0].outerHTML );
// }});
