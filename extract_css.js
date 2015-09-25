var cheerio = require('cheerio'),
	//jsdom = require('node-jsdom'),
	jsdom = require('jsdom'),
	//$ = require('jquery'),
	fs = require('fs'),
	path = require('path'),
	Entities = require('html-entities').XmlEntities;

var here = require('here').here;

var util = require('util');
//var source = process.argv[2] || './bible.html',
var source = process.argv[2] || '../bible.css',
	suffix = '.css',
	odir = path.join(__dirname, './extracted_attachments') ||
		path.join(__dirname, path.dirname( source )),
	output = odir + '/' + path.basename( source, '.css' ) + suffix;

console.log( source );
console.log( output );

//var code = fs.readFileSync( source ); // source is bad name. should be use filename
var code = here(/*
body {
width:95%;
background-color:#FFE;
background-image:url(jpg/back007.jpg);
background-repeat:repeat-x;
padding-top:70px;
}

h4 {
width:67%;
color:green;
margin-top:10px;
text-align:left;
line-height:1.5;
}

p {
line-height:1.5;
}

p.nyuumonn2 {
width:69%;
color:green;
text-indent:1em;
font-weight:700;
text-align:left;
}

em {
font-size:1.2em;
}

strong {
color:#DC143C;
background-color:#F0E68C;
}

hr {
height:4px;
background-color:#3C6;
width:90%;
margin-top:10px;
}

a:hover {
color:#F69;
}

a:active {
color:green;
}

a:link,a:visited {
color:#06F;
}
*/);

var css = require('css');
// var obj = css.parse(code, { silent:, source:});
var ast = css.parse( code );

ast.stylesheet.rules.forEach( function( rule ){
	if ( rule.selectors.indexOf('body') !== -1 ){
		rule.declarations.forEach( function( declaration ){
			if ( declaration.property === 'background-image'){
				//console.log( util.inspect( declaration ));
				//console.log( declaration.value );
				//.substr( 'url(', ')');
				var image = declaration.value.substring( declaration.value.indexOf("url(") + 4,
						declaration.value.indexOf(")"));
				console.log( image );
			}
		});
	}
});
