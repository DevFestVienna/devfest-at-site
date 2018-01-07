#!/bin/sh

LOCAL_DIR=`dirname $0`
CSS_SOURCE="$1"
JS_SOURCE="$2"

sh $LOCAL_DIR/minify_css.sh "$CSS_SOURCE"
sh $LOCAL_DIR/minify_js.sh "$JS_SOURCE"
