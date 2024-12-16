#!/bin/bash
file=foodwebapp
server=34.173.177.156
rm -R dist
npm run build
tar -cf ../$file.tar.xz --exclude='node_modules' --exclude='src' --exclude='package-lock.json' --exclude='.angular' ../$file
scp ../$file.tar.xz vampi@$server:
ssh vampi@$server tar -xf $file.tar.xz
ssh vampi@$server rm $file.tar.xz
ssh vampi@$server sudo rm -rf /var/www/$file
ssh vampi@$server sudo mv $file /var/www/
