var categories = [
	'activity',
	'school',
	'circle',
	'alfonso',
	'material',
	'pentecost',
	'news',
	'contact',
	'background',
	'banner'
];

var cateogory_hierarchy = {
	'activity': [ 'school', 'mass', 'bible', ],
	'circle': [ 'alfonso', 'legiomariae', 'handbell', ],
	'material': [ 'pentecost', 'about-alfonso', 'resource' ],
	'contact': [ 'box', 'contact_address' ]
};


var pages = [
'../2468.html',
'../Pente3.html',
'../base2.html',
'../bible.html',
'../box.html',
'../choir.html',
'../gyoumu.html',
'../handbell.html',
'../index.html',
'../legiomariae.html',
'../link.html',
'../mass.html',
'../pentecoste.html',
'../profile.html',
'../school.html',
], posts = [
'../pentecoste.html',
'../school.html',
'../choir.html', // alfonso
], attachments = [
];

var category_of_id = {
	'school':[
		],
	'alfonso':[
		],
	'pentecost':[
		],
	'news':[
		],
	'contact':[
		],
	'background':[
		],
	'banner':[
		]
};

var files = [
	'jpg_list.txt',
	'wav_list.txt',
	'pdf_list.txt',
];

var relation = {
	'jpg_list.txt': ['school', 'alfonso', 'banner'],
	'wav_list.txt': ['alfonso'],
	'pdf_list.txt': ['pentecost'],
};
