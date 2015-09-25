<?php
//$the_slug = 'tapeseirei.jpg';
$the_slug = $args[0];
$arguments = [
	'name' => $the_slug,
	//'post_mime_type' => '',
	//'post_status' => 'publish',
    //'post_title'=>'',
    //'post_name'=>'',
    //'post_mime_type'=>'',
	'post_type' => 'attachment',
];
$posts = get_posts( $arguments );

$n_post = count($posts);
if ( $n_post == 0 ){
	//echo "There is no posts about this query.\n";
	//echo "slug = ".$the_slug."\n";
	//var_dump( $posts );
	exit(1);
} elseif ( $n_post == 1) {
	$id = $posts[0]->ID;
	$url = wp_get_attachment_url($id)."\n";

	echo $the_slug."\t";
	echo $id."\t";
	echo $url;
	exit(0);
} else {
	//echo "posts number is $n_post\n";
	//echo "This is an unexpected incident.\n";
	//echo "slug = ".$the_slug."\n";
	//var_dump( $posts );
	exit(1);
}
?>
