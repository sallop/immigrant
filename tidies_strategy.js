var	fs = require('fs'),
	path = require('path'),
	Entities = require('html-entities').XmlEntities;

var spawn = require('child_process').spawn,
	exec = require('child_process').exec;

var source = process.argv[2] || 'foo.html',
	prefix = 'ex_',
	output = path.dirname( source ) + '/' + prefix + path.basename( source );

//function tidy(src, dest){
//	var tidy;
//	if ( file === 'html' ){
//	} else if ( file === 'css'){
//	} else {
//		// error processing
//	}
//
//	// output -> stdout, file
//	tidy.stdout.on('data', function (data){
//		console.log('stdout: ' + data);
//	});
//
//	tidy.stderr.on('data', function(data){
//		console.log('stderr: ' + data);
//	});
//
//	tidy.on('close', function (code){
//		console.log('child process exited with code ' + code);
//	});
//}


var Tidy = function( options ){
	this.src = "./bible.html";
	this.dest = "./tidied_bible.html";
	this.command = "";
	for(var prop in options){
		if ( this.hasOwnProperty( prop )){
			this[prop] = options[prop];
		}
	}
};

Tidy.prototype = {
	setStrategy: function(command){
		this.command = command;
	},
	exec: function(){
		console.log( typeof this.command );
		console.log( this.command );

		this.command();
		return "this.command";
	}
};

var HTML = function() {
	//var process = spawn('tidy', ['-utf8', '-o', this.dest, this.src]);
	var command = ['tidy', '-utf8', '-o', this.dest, this.src].join(' ');

	var result = exec( command,
			function( error, stdout, stderr ){
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null){
					console.log('exec error: ' + error);
				}
			});
	console.log( result );
	return result;
};

var CSS = function(){
	var command = ['csstidy', this.src, this.dest].join(' ');
	var result = exec( command, 
			function( error, stdout, stderr ){
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null){
					console.log('exec error: ' + error);
				}

			});
	return result;
};

// log helper
var log = (function(){
	var log = "";
	return {
		add: function(msg){
			log += msg + "\n";
		},
	show: function(){
		console.log(log);
	}
	};
})();

function run(){
	// the 3 strategies
	var tidy = new Tidy();
	var options = {
		src: "./bible.html",
		dest: "./tidied_bible.html",
		command: ""
	};
	//var csstidy = new CSS();

	//tidy.setStrategy(new HTML());
	//log.add("HTML Strategy: " + tidy.exec());
	//tidy.setStrategy(new CSS());
	//log.add("CSS Strategy: " + tidy.exec());

	tidy.setStrategy( CSS  );
	log.add("HTML Strategy: " + tidy.exec());
	tidy.setStrategy( HTML );
	log.add("CSS Strategy: " + tidy.exec());
	log.show();

}

run();
