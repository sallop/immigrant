var	fs = require('fs'),
	path = require('path'),
	Entities = require('html-entities').XmlEntities;

var util = require('util');

var spawn = require('child_process').spawn;

var source = process.argv[2] || './bible.html',
//var source = process.argv[2] || './bible.css',
	prefix = 'tidied_',
	output = path.dirname( source ) + '/' + prefix + path.basename( source );

var Tidy = function(){
	this.command = "";
};

Tidy.prototype = {
	setStrategy: function(command){
		this.command = command;
	},
	exec: function(option){
		var cmd = this.command.exec(option);
		cmd.stdout.on('data', function (data){
			console.log('stdout: ' + data);
		});

		cmd.stderr.on('data', function(data){
			console.log('stderr: ' + data);
		});

		cmd.on('close', function (code){
			console.log('child process exited with code ' + code);
		});
		return;
		//return this.command.exec(option);
	}
};

var HTML = function() {
	this.exec = function(option){
		var dest = option.dest,
			src = option.src;
		return spawn('tidy', ['-utf8', '-o', dest, src]);
	};
};

var CSS = function(){
	this.exec = function(option){
		var dest = option.dest,
			src = option.src;
		//command = spawn('tidy', ['-utf8', '-o', dest, src]);
		return spawn('csstidy', [src, dest]);
	};
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
	var option = {
		src: 'bible.html',
		dest: 'tidied_bible.html'
	};

	// the 3 strategies
	var tidy = new Tidy();
	//var csstidy = new CSS();

	tidy.setStrategy(new HTML());
	//log.add("HTML Strategy: " + tidy.exec(option));
	log.add("HTML Strategy: " + tidy.exec(option));

	var cmd = tidy.exec(option);
	option = {
		src: 'bible.css',
		dest: 'tidied_bible.css'
	};

	tidy.setStrategy(new CSS());
	log.add("CSS Strategy: " + tidy.exec(option));
	cmd = tidy.exec(option);


	log.show();
}

run();
