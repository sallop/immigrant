#!/bin/bash

for f in `ls ../*.html`; do
	node replace_url_for_wp.js $f
done
