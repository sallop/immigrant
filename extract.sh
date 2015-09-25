#!/bin/bash

for f in `ls *.html`;
do
	echo $f
	node extract_post_data.js $f
done
