#!/bin/sh
# value= `cat $PWD/scripts/nginx.conf`
# echo "$value"
value=`cat $PWD/scripts/nginx.conf`
echo "$value"
ssh -t root@192.34.60.197 "source ~/.nvm/nvm.sh;
git clone https://github.com/munirdev369/practice-sql.git;
cd practice-sql;
yarn;
tsc && vite build;
"