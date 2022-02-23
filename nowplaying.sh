#!/usr/bin/env bash

. nowplaying.config

if [ -z "$2" ]; then echo -e "\nconfig file has path: $np_path. using that.\n"; fi

if [ ! -z "$2" ]; then
  if ! test -f "$1"; then
    echo "output file location does not exist. creating at $1"
    touch "$1"
  fi
fi

if [ -z "$1" ] && [ -z $np_path ]; then
  echo 'no file path provided.'
  exit 0
fi

if [ -z "$2" ] && [ -z "$1" ]; then
  echo 'no text provided.'
  exit 0
fi

# store the path in a config file for later use
if [ -z $np_path ] && [ ! -z "$1" ] && [ ! -z "$2" ]; then
  echo "np_path=$1" > nowplaying.config
fi

if [ ! -z $np_path ] && [ ! -z "$1" ] && [ -z "$2" ]; then
  echo "$1" > $np_path
elif [ ! -z "$1" ] && [ ! -z "$2" ]; then
  echo "$2" > "$1"
else
  echo 'something seems off...'
fi

echo -e 'new contents of now playing message:\n'
cat $np_path
echo ''

should_commit=false

while true; do
    echo 'commit and push this change?'
    read yn
    case $yn in
        [Yy]* ) should_commit=true; break;;
        [Nn]* ) break;;
        * ) echo 'say yes or no, please!';;
    esac
done

if [[ $should_commit = false ]]; then
  echo 'bye!'
  exit
fi

git add $np_path
git commit -S -m "再生中 @ $(date)" -m "$2"
git push origin main
