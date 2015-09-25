#!/bin/bash

slugs="activity circle contact material news school template uncategorized 552 551 550 553"

for slug in $slugs; do
	#cat <<EOF
	cat > page-${slug}.php <<EOF
<?php
/*
Template Name: $slug
*/
echo __FILE__;
?>
EOF
done


