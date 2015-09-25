//var spawn = require('child_process').spawn;
exec = require('child_process').exec;

// some html lost
// should be diff
var posts = [
	'extracted_2468.html',
	'extracted_Pente3.html',
	'extracted_base2.html',
	'extracted_bible.html',
	'extracted_box.html',
	'extracted_choir.html',
	'extracted_gyoumu.html',
	'extracted_handbell.html',
	'extracted_image_on_page.html',
	'extracted_index.html',
	'extracted_legiomariae.html',
	'extracted_link.html',
	'extracted_mass.html',
	'extracted_pentecoste.html',
	'extracted_profile.html',
	'extracted_school.html'
];

var posts = [
{
	'file': 'extracted_2468.html',
		'options': {
			'--post_title': '2468',
			'--post_status': 'pending',
			'--post_type': 'page'
		}
},
{
	'file': 'extracted_Pente3.html',
	'options': {
		'--post_title': 'pente3',
		'--post_status': 'publish',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_base2.html',
	'options': {
		'--post_title': 'base2',
		'--post_status': 'pending',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_bible.html',
	'options': {
		'--post_title': '聖書勉強会',
		'--post_status': 'publish',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_box.html',
	'options': {
		'--post_title': '投稿用フォーム',
		'--post_status': 'publish',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_choir.html',
	'options': {
		'--post_title': 'アルフォンソ合唱団',
		'--post_status': 'publish',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_gyoumu.html',
	'options': {
		'--post_title': '活動案内',
		'--post_status': 'pending',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_handbell.html',
	'options': {
		'--post_title': 'ハンドベル',
		'--post_status': 'publish',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_index.html',
	'options': {
		'--post_title': 'トップページ',
		'--post_status': 'pending',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_legiomariae.html',
	'options': {
		'--post_title': 'レジオマリエ',
		'--post_status': 'publish',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_link.html',
	'options': {
		'--post_title': 'リンク',
		'--post_status': 'pending',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_mass.html',
	'options': {
		'--post_title': 'ミサ',
		'--post_status': 'publish',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_pentecoste.html',
	'options': {
		'--post_title': 'ペンテコステ',
		'--post_status': 'publish',
		'--post_type': 'page'
	}
},
{
	'file': 'extracted_profile.html',
	'options': {
		'--post_title': 'プロフィール',
		'--post_status': 'pending',
		'--post_type': 'page'
	}
},
{

	'file': 'extracted_school.html',
	'options': {
		'--post_title': 'プロフィール',
		'--post_status': 'pending',
		'--post_type': 'page'
	}
}
];


//var cmd = 'wp';
// args = [
// 	'post',
// 	'create',
// 	'./ex_2468.html',
// 	'--post_title="2468',
// 	'--post_status="publish"',
// 	'--post_date="2006-04-15" ',
// 	//'--post_content="./ex_2468.html"'
// ];

//cmd = cmd + ' ' + args.join(' ');
//console.log('cmd = ' + cmd);
//var wp = spawn('wp', ['post', 'list']);
//var wp = spawn('wp', args);
// var wp = exec( cmd, function (error, stdout, stderr){
// 	console.log('stdout: ' + stdout);
// 
// });
//wp.stdout.on('data', function(data){
//	console.log(data);
//});
//
//wp.stderr.on('data', function(data){
//	console.log('stderr:' + data);
//});
	   
//exec('pwd', function callback(error, stdout, stderr){
//	console.log( stdout );
var cmd = 'wp post create';
posts.forEach(function(post){
    var exec_cmd = cmd, file = post['file'], options = post['options'];
    exec_cmd += ' ' + file;
    for(var key in options){
	exec_cmd += ' ' + key + '='+ '"' + options[key] + '"';
	//console.log(key + '=' + options[key]);
    }
	exec_cmd += '\n';
    console.log( exec_cmd );    
    var wp = exec( exec_cmd, function( error, stdout, stderr ){
	if (error !== null){
	    console.log(error);
	}
	console.log('stdout: '+stdout);
	console.log('stdout: '+stderr);
    });
});
