#!/bin/sh
ssh root@192.34.60.197
cd practice_sql
git pull
rm -rf node_modules
yarn install