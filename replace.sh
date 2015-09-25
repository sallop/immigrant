#!/bin/bash

for f in `ls *.html`; do
	node extracted_body.js $f
done
