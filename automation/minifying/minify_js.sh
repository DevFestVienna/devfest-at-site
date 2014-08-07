#! /bin/sh

LOCAL_DIR=`dirname $0`
if [ "$1" = "" ]
then
  SOURCE="../../js"
else
  SOURCE="$1"
fi

echo Optimizing js with yuicompressor
for file in $SOURCE/*.js
do
  file2=$SOURCE/`basename $file .min.js`
  if [ "$file2" = "$file" ]
  then
    echo "processing $file"
    file2=$SOURCE/`basename $file .js`.min.js
    java -jar $LOCAL_DIR/yuicompressor-2.4.8.jar $file -o $file2
  fi
done
