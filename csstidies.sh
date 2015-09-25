#!/bin/bash

odir="csstidied"


for f in `ls *.css`; do
	#echo $f
	csstidy $f $odir/$f
done
