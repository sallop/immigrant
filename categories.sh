#!/bin/bash

function set_category {
	ID=$1
	category=$2
	wp post term set $ID category $category
	# #wp post term remove $i post_tag zxxcv
	wp post term list $ID post_tag --format=csv
}


# 636,第二回谷山宗教音楽祭
# 635,御復活祭2006
# 634,ケンプター・パストラールミサ
# 550,クリスマス
# 551,ハロウィン
# 552,仏寺訪問
# 553,春の遠足

#for i in `wp post list --format=ids`;
for i in 550 551 552 553;
do
	:
	set_category $i school

	#wp post term set $i category school
	#wp post term remove $i post_tag zxxcv
	#wp post term list $i post_tag --format=csv
done

for i in 636 635 634 ;
do
	:
	set_category $i alfonso
done
