#!/bin/sh

LOCAL_DIR=`dirname $0`
SOURCE=../../css

echo Optimizing style.css to style.min.css
cd $SOURCE && java -jar $LOCAL_DIR/yuicompressor-2.4.8.jar style.css -o style.min.css
