#!/usr/bin/node

var extract = require('./extract_tags.js');

var bodyStrategy = new extract.cheerioBodyStrategy({
	name: "bodyStrategy",
	prefix: "bodies_",
	suffix: ".html",
	src: "./bible.html",
	dest: "./ex_bible.html"
});

var styleStrategy = new extract.cheerioStyleStrategy({
	name: 'styleStrategy',
	prefix: 'style_',
	suffix: '.html',
	src: './bible.html',
	dest: './bible.css'
});

var imageStrategy = new extract.cheerioImageStrategy({
	name: 'imageStrategy',
	prefix: 'image_',
	suffix: '.html',
	src: './bible.html',
	dest: './bible.lst'
});

var data = bodyStrategy.get();
bodyStrategy.write();

data = styleStrategy.get();
styleStrategy.write();

data = imageStrategy.get();
imageStrategy.write();

