#!/bin/bash

# file='wav_list.txt'
# ids=`awk -e '{ print $1 }' $file`
# 
# echo "$ids"
# 
# for id in $ids; do
# 	wp post term set $id category alfonso
# done
# 
# file='pdf_list.txt'
# ids=`awk -e '{ print $1 }' pdf_list.txt`
# for id in $ids; do
# 	wp post term set $id category pentecost
# done

file='jpg_list2.txt'
# while read -r line
while read -r id attachment category
do
	# name=$line
	# echo "Name read from file - $name"
	# echo $id	$attachment	$category
	# :
	# echo "wp post term set $id category $category"
	wp post term set $id category $category
done < "$file"
