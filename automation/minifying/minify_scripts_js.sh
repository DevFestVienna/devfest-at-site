#!/bin/sh

LOCAL_DIR=`dirname $0`
SOURCE=../../js

echo Optimizing scripts.js to scripts.min.js
cd $SOURCE && java -jar $LOCAL_DIR/yuicompressor-2.4.8.jar scripts.js -o scripts.min.js
