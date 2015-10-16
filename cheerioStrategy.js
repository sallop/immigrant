#!/usr/bin/node

var fs = require('fs'),
	path = require('path');

var assert = require('assert');

var here = require("here").here,
	cheerio = require('cheerio'),
	Entities = require('html-entities').XmlEntities;

function cheerioStrategy( options ){
	var options = options || {};

	// member of this class
	// it's not refer to child class
	// but, it will be copied by .apply() or .call()
	this.name = "cheerio";
	this.prefix = "ex_";
	this.suffix = ".html"; // extension for output file
	this.src = "./bibile.html";
	this.dest = "";
	this.odir = path.dirname( this.src );
	this.processed = "";

	for(var prop in options){
		if( this.hasOwnProperty(prop) ){
			this[prop] = options[prop];
		}
	}

	if( this.dest == "" ){
		//this.dest = this.odir + '/' + this.prefix + path.basename( this.src, this.suffix );
		this.dest = this.odir + '/' + this.prefix + path.basename( this.src, path.extname(this.src) ) + this.suffix;
		//assert(true, "this.dest = " + this.dest );
		console.log("this.dest = " + this.dest );
	}

	// Note:
	// $ of the property will be copied to child class
	// propably, this is duplicate instance
	this.$ = cheerio.load( fs.readFileSync( this.src )); // second opinion
}

cheerioStrategy.prototype.sharedCode = function( cb ){
	// this is prototype
	// it may not copy to child class at constructor
	// after called this class
	// it member will be add to this property
	// it maybe move to parent constructor
	
	// this.$ = cheerio.load( fs.readFileSync( this.src )); // originai\l
	
	//var entities = new Entities();
	var callback = cb || function(){};
	var data = callback();
	return data;
	//return entities.decode( data );
};

cheerioStrategy.prototype.get = function(){
	var self = this;
	this.sharedCode(function(){
		return "sheerioStrategy callback";
	});
	this.write();
};

cheerioStrategy.prototype.write = function(){
	var rstream = fs.createReadStream( this.src, {
		flags: 'r',
		encoding: 'utf8',
		mode: 0666,
		autoClose: true
	});

	var wstream = fs.createWriteStream( this.dest, {
		flags: 'w',
		encoding: 'utf8',
		mode: 0666
	});
	//rstream.pipe(process.stdout);
	//rstream.pipe( wstream );

	// to output data and buffer
	// chunk String|Buffer: Optional data to write
	// String: The encoding, if chunk is a String
	// callback: Function Optional callback for when the stream is finished
	// wstream.write( chunk, [encoding], [callback]);
	//
	wstream.write( this.processed, 'utf8' );
	process.stdout.write( this.processed );
};

var inherit = (function(){
	var F = function(){};
	return function(C, P){
		F.prototype = P.prototype;
		C.prototype = new F();
		C.uber = P.prototype;
		C.prototype.constructor = C;
	};
}());

function cheerioBodyStrategy( options ){
	this.name = "cheerioBodyStrategy";
	cheerioStrategy.apply(this, arguments);
	//cheerioStrategy.call(this, options);
}

function cheerioStyleStrategy(){
	this.name = "cheerioStyleStrategy";
	cheerioStrategy.apply(this, arguments);
	//cheerioStrategy.call(this, options);
}


function cheerioImageStrategy(){
	this.name = "cheerioImageStrategy";
	cheerioStrategy.apply(this, arguments);
	//cheerioStrategy.call(this, options);
}

inherit(cheerioBodyStrategy, cheerioStrategy);
inherit(cheerioStyleStrategy, cheerioStrategy);
inherit(cheerioImageStrategy, cheerioStrategy);

cheerioBodyStrategy.prototype.get = function(){
	var self = this;
	var $ = this.$;
	this.processed = this.sharedCode(function(){
		return $('body').html();
	});
	return this.processed;
};

cheerioStyleStrategy.prototype.get = function(){
	var self = this;
	var $ = this.$;
	this.processed = this.sharedCode(function(){
		return $('style').html();
	});
	return this.processed;
};

cheerioImageStrategy.prototype.get = function(){
	var self = this;
	var $ = this.$;
	var data = this.sharedCode( function(){
		var data = [];
		$('*').each( function(){
			if ($(this).is('img')){
				data.push($(this).attr('src'));
			} else {
				backImg= $(this).css('background-image');
				if ( backImg && backImg != 'none'){
					data.push( backImg );
				}
			}
		});
		// from extract_img.js
		// it doesn't work
		//$('img').each( function ( i, element ){
		//	for(var key in element){
		//		//data[key] = element[key];
		//		console.log(key + "=" + element[key]);
		//	}
		//});
		//console.dir( data );
		return data;
	});
	this.processed = data.join('\n') + "\n";
	return data;
};



//var jqStrategy = new cheerioStrategy();
//jqStrategy.get();
var options = {
	name: "bodyStrategy",
	prefix: "bodies_",
	suffix: ".html",
	src: "./bible.html",
	dest: "./ex_bible.html"
};

var bodyStrategy = new cheerioBodyStrategy( options );
var styleStrategy = new cheerioStyleStrategy({
	name: 'styleStrategy',
	prefix: 'style_',
	suffix: '.html',
	src: './bible.html',
	dest: './bible.css'
});

var imageStrategy = new cheerioImageStrategy({
	name: 'imageStrategy',
	prefix: 'image_',
	suffix: '.html',
	src: './bible.html',
	//dest: './bible.lst'
});

//var data = bodyStrategy.get();
//var data = styleStrategy.get();
var data = imageStrategy.get();

//console.dir( styleStrategy );
//console.dir( imageStrategy );

//bodyStrategy.write();
//styleStrategy.write();
imageStrategy.write();

console.log("\n");

var imageStrategy2 = new cheerioImageStrategy({
	name: 'imageStrategy',
	prefix: 'image_',
	suffix: '.html',
	src: './profile.html',
	//dest: './bible.lst'
});
data = imageStrategy2.get();
imageStrategy2.write();

