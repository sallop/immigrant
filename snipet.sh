#!/bin/bash
wp post term set $ID category $category
wp post term list $ID post_tag --format=csv
wp post create --post_title="" --post_status="" --post_date="" --post_content=""

# post ids
wav_list.txt
jpg_list.txt
pdf_list.txt

# category
activity
school
circle
alfonso
material
pentecost
news
contact

#image
background
banner
