#!/usr/bin/tidy

odir='tidied'

for file in `ls *.html`;
do
	tidy -utf8 -o ${odir}/${file} ${file}
done
