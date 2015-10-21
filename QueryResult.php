<?php
class QueryResult {
	function __construct( $arg1 ){
		//$the_slug = $args[0];
		if ( 'string' == gettype( $arg1 ) ){
			$slug = $arg1;
			$arguments = [
				'name' => $slug,
				//'post_mime_type' => '',
				//'post_status' => 'publish',
				//'post_title'=>'',
				//'post_name'=>'',
				//'post_mime_type'=>'',
				'post_type' => 'attachment',
			];
		} elseif ( 'array' === gettype( $arg1 )){
			$arguments = $arg1;
		}
		$this->posts = get_posts( $arguments );
		//array(1) {
		//	[0]=> object(WP_Post) #121 (24) {
		//	["ID"]
		//	["post_author"]
		//	["post_date"]
		//	["post_date_gmt"]
		//	["post_content"]
		//	["post_title"]
		//	["post_excerpt"]
		//	["post_status"]
		//	["comment_status"]
		//	["ping_status"]
		//	["post_password"]
		//	["post_name"]
		//	["to_ping"]
		//	["pinged"]
		//	["post_modified"]
		//	["post_modified_gmt"]
		//	["post_content_filtered"]
		//	["post_parent"]
		//	["guid"]
		//	["menu_order"]
		//	["post_type"]
		//	["post_mime_type"]
		//	["comment_count"]
		//}
	}

	function none(){
		if ( count($this->posts) < 1 ){
			//return $this->posts;
			return [
				'slug' => NULL,
				'id' =>  NULL,
				'url' => NULL 
			];
		}
		return NULL;
	}

	function unique(){
		if ( 1 == count($this->posts) ){
			$post = $this->posts[0];
			return [
				//'slug' => $post->post_name,
				'slug' => $post->post_title,
				'id' =>  $post->ID,
				'url' => $post->guid
			];
		}
		return NULL;
	}

	function duplicated(){
		if ( 1 < count($this->posts) ){
			$posts = [];
			foreach( $this->posts as $post ){
				array_push( $posts, [
					//'slug' => $post->post_name,
					'slug' => $post->post_name,
					'id' => $post->ID,
					'url' => $post->guid
				]);
			}
			return $posts;
		}
		return NULL;
	}

	function get(){
		if(($data = $this->none()) !== NULL)
			return $data; 
		if(($data = $this->unique()) !== NULL)
			return $data; 
		if(($data = $this->duplicated()) !== NULL)
			return $data;
		return NULL;
	}
}
//$the_slug = 'tapeseirei.jpg';
$the_slug = $args[0];
$query_result = new QueryResult( $the_slug );

//var_dump( $query_result->none() );
//var_dump( $query_result->unique() );
//var_dump( $query_result->duplicated() );

//$query_result = new QueryResult([
//	'name' => $the_slug,
//	//'post_mime_type' => '',
//	//'post_status' => 'publish',
//	//'post_title'=>'',
//	//'post_name'=>'',
//	//'post_mime_type'=>'',
//	'post_type' => 'attachment',
//]);

//$data = $query_result->unique();
$data = $query_result->get( );
if ($data !== NULL){
	echo "$the_slug"."\n";
	var_dump( $data );
	echo $data['slug']."\t".$data['id']."\t".$data['url']."\n";
}

//var_dump( $query_result->none() );
//var_dump( $query_result->unique() );
//var_dump( $query_result->duplicated() );
//$query_result->get_id_by_slug( $the_slug );

?>

