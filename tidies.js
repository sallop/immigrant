var	fs = require('fs'),
	path = require('path'),
	Entities = require('html-entities').XmlEntities;

var spawn = require('child_process').spawn,
	exec = require('child_process').exec;

var inherit = (function(){
	var F = function(){};
	return function(C, P){
		F.prototype = P.prototype;
		C.prototype = new F();
		C.uber = P.prototype;
		C.prototype.constructor = C;
	};
}());


var Tidy = function( options ){
	this.prefix = "tidied_";
	this.suffix = ".html";

	this.src = "./bible.html";
	this.dest = "";

	this.odir = path.dirname( this.src );
	this.processed = "";
	this.command = "";

	for(var prop in options){
		if ( this.hasOwnProperty( prop )){
			this[prop] = options[prop];
		}
	}

	this.dest = options['dest'] ||
		this.odir + '/' + this.prefix +
		path.basename( this.src, path.extname( this.src ) ) +
		this.suffix;
};

Tidy.prototype = {
	exec: function(){
		console.log( this.command );
		return "this.command";
	}
};

function HtmlTidy( options ){
	Tidy.call(this, options);
}

function CssTidy( options ){
	Tidy.call(this, options);
}

inherit( HtmlTidy, Tidy );
inherit( CssTidy, Tidy );

HtmlTidy.prototype.exec = function(){
	var command = ['tidy', '-utf8', '-o', this.dest, this.src].join(' ');
	console.log( command );

	return exec( command,
			function( error, stdout, stderr ){
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null){
					console.log('exec error: ' + error);
				}
			});
};

CssTidy.prototype.exec = function(){
	var command = ['csstidy', this.src, this.dest].join(' ');
	return result = exec( command, 
			function( error, stdout, stderr ){
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null){
					console.log('exec error: ' + error);
				}

			});
};

module.exports = {
	Tidy: Tidy,
	HtmlTidy: HtmlTidy,
	CssTidy: CssTidy
};
