#!/bin/sh

LOCAL_DIR=`dirname $0`
if [ "$1" = "" ]
then
  SOURCE=../../css
else
  SOURCE="$1"
fi

echo Optimizing css with yuicompressor
for file in $SOURCE/*.css
do
  file2=$SOURCE/`basename $file .min.css`
  if [ "$file2" = "$file" ]
  then
    echo processing $file
    file2=$SOURCE/`basename $file .css`.min.css
    java -jar $LOCAL_DIR/yuicompressor-2.4.8.jar $file -o $file2
  fi
done
