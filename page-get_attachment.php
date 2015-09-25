<?php
/*
Template Name: get_attachment
*/
?>
<doctype html>
<head>
<title>page-get_attachment</title>
<style>
body {
<?php
$id = 464;
$background_image = wp_get_attachment_image_src( $id )[0];
// $background_image = get_attachment_url( $id ); // not work
// $background_image = get_attachment_link( $id ); // not work
// $background_image = '/home/sallop/var/www/wp_taniyama/wp-content/uploads/2015/07/back001.jpg';
$background_image = '/wp_taniyama/wp-content/uploads/2015/07/back001.jpg';
?>
	background-color: #b0c4de;
	background-image: url('<?php echo $background_image;?>');
/*
	background-color: #666666;
	background-image: url('wp-content/uploads/2015/07/back001.jpg')
*/
}
</style>
</head>
<body>
<?php
echo $background_image;
//$id = 464;
$func_args = [
	//['wp_get_attachment_image',	[$id]],
	['get_attached_file',		[$id]],
	['get_attachment_link',		[$id]],
	//['wp_get_attachment_image',	[$id]],
	['wp_get_attachment_image_src', [$id,'full']],
	['get_attached_file', [$id]],
	['get_background_image', [$id]],
	['get_stylesheet', [$id]],
	['get_stylesheet_directory', [$id]],
	['get_stylesheet_directory_uri', [$id]],
	['get_stylesheet_uri', [$id]],
	['get_template', [$id]],
	['get_template_directory', [$id]],
	['get_template_directory_uri', [$id]],
	['get_theme_root', [$id]],
	['get_theme_roots', [$id]],
	['get_theme_roots', [$id]],
	['wp_get_attachment_image_src', [$id]],
	//['wp_get_attachment_link', [$id]],
	['wp_get_attachment_uri', [$id]],
];

echo '<table border="1">';
foreach( $func_args as $fa ) {
	$func = $fa[0];
	$args = $fa[1];
	echo '<tr>';
	echo '<td>';
	echo $func;
	echo '</td>';
	echo '<td>';
	foreach( $args as $arg ){
		echo $arg.",";
	}
	echo '</td>';
	echo '<td>';
	//echo $func( $args );
	echo call_user_func_array( $func, $args );
	//echo '<img src="'.call_user_func_array( $func, $args ).'"</img>';
	echo '</td>';
	echo '</tr>';
}
echo '</table>';
?>
<img src='/home/sallop/var/www/wp_taniyama/wp-content/uploads/2015/07/back001.jpg'></img>
<img src='http://www.hakobune.com/wp_taniyama/?attachment_id=464'></img>
<img src='/home/sallop/var/www/wp_taniyama/wp-content/uploads/2015/07/back001.jpg'></img>
<img src='http://www.hakobune.com/wp_taniyama/wp-content/uploads/2015/07/back002.jpg'>Work</img>

<img src='var/www/wp_taniyama/wp-content/uploads/2015/07/back001.jpg'></img>
<img src='http://www.hakobune.com/wp_taniyama/?attachment_id=464'></img>
<img src='wp_taniyama/?attachment_id=464'></img>
<img src='wp-content/uploads/2015/07/back001.jpg'>Work</img>
<img src='uploads/2015/07/back001.jpg'></img>
<img src='http://www.hakobune.com/wp_taniyama/wp-content/uploads/2015/07/back002.jpg'>Work</img>
</body>
</html>
