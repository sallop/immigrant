#!/bin/bash

while read line
do
	[ -z $line ] && continue
	[[ $line =~ ^#.* ]] && continue
	# [ -z $line ] || [[ $line =~ ^#.* ]] && continue
	
	# ignore #keyword, blank and ^$ line
	wp eval-file get_id_by_slug.php $line
	# echo $?
done <all_image.txt
