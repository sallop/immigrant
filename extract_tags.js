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
	this.entities = new Entities();
}

cheerioStrategy.prototype.sharedCode = function( cb ){
	// this is prototype
	// it may not copy to child class at constructor
	// after called this class
	// it will be add to this property
	// this instance should be move to parent constructor
	
	// this.$ = cheerio.load( fs.readFileSync( this.src )); // originai\l
	
	var callback = cb || function(){};
	var data = callback();
	return  data;
	//return this.entities.decode( data ); cheerioImageStrategy doesn't return String
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
	return this.entities.decode( this.processed );
};

cheerioStyleStrategy.prototype.get = function(){
	var self = this;
	var $ = this.$;
	this.processed = this.sharedCode(function(){
		return $('style').html();
	});
	return this.entities.decode( this.processed );
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
		return data;
	});
	this.processed = data.join('\n') + "\n";
	return data;
};

module.exports = {
	cheerioStrategy: cheerioStrategy,
	cheerioBodyStrategy: cheerioBodyStrategy,
	cheerioStyleStrategy: cheerioStyleStrategy,
	cheerioImageStrategy: cheerioImageStrategy
};
