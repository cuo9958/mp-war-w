#!/bin/bash

git pull

npm run build

cp -rf dist/ /www/wwwroot/mp.guofangchao.com/