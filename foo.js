var tidies = require('./tidies.js');

console.log( tidies );
console.dir( tidies );
console.log( tidies.Tidy );
console.log( tidies.HtmlTidy );
console.log( tidies.CssTidy );

var tidy = new tidies.HtmlTidy({
	prefix: "td_",
	suffix: ".html",
	src: "./bible.html",
});

tidy.exec();

tidy = new tidies.CssTidy({
	prefix: "td_",
	 suffix: ".css",
	 src: "./bible.css",
});

tidy.exec();


