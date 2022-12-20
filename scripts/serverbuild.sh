#!/bin/sh
ssh -t root@192.34.60.197 "
source ~/.nvm/nvm.sh;
cd practice-sql;
git pull;
rm -rf node_modules;
yarn install;
yarn build;
cp -r ~/practice-sql/dist/* /var/www/practicesql;
"