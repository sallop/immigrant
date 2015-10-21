<?php
class QueryResult {
	public $get_data;

	function __call($name, $args){
		return call_user_func_array($this->$name, $args);
	}

	function __construct( $arg1, $arg2 ){
		//$the_slug = $args[0];
		if ( 'string' == gettype( $arg1 ) ){
			$slug = $arg1;
			$arguments = [
				'name' => $slug,
				'post_type' => 'attachment',
			];
		} elseif ( 'array' === gettype( $arg1 )){
			$arguments = $arg1;
		}
		$this->posts = get_posts( $arguments );
		$this->get_data = $arg2;
	}

	function none(){
		if ( count($this->posts) < 1 ){
			return $this->get_data( $this->posts );
		}
		return NULL;
	}

	function unique(){
		if ( 1 == count($this->posts) ){
			$post = $this->posts[0];
			return $this->get_data( $post );
		}
		return NULL;
	}

	function duplicated(){
		if ( 1 < count($this->posts) ){
			$posts = [];
			foreach( $this->posts as $post ){
				array_push( $posts, $this->get_data( $this->posts ));
			}
			return $posts;
		}
		return NULL;
	}

	function get(){
		$functions = [
			'none',
			'unique',
			'duplicated',
		];
		foreach( $functions as $func ){
			if( ($data = $this->$func()) !== NULL ){
				return $data;
			}
		}
		return NULL;
	}
}

//$the_slug = 'tapeseirei.jpg';
$the_slug = $args[0];
$query_result = new QueryResult( $the_slug, function($post){
	var_dump( $post );
	return [
		'slug' => $post->post_name,
		'id' => $post->ID,
		'url' => $post->guid
	];
});

$data = $query_result->none();
$data = $query_result->unique();
$data = $query_result->duplicated();
var_dump( $data );

$data = $query_result->get();
var_dump( $data );
?>
