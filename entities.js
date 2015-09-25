var Entities = require('html-entities').XmlEntities,
	fs = require('fs');

entities = new Entities;

var buf = fs.readFileSync('./ex_bible.html', 'utf8');

console.log( buf );
console.log( entities.decode(buf) );
