#!/usr/bin/env sh

set -e

# npm run blog:build
yarn build

source env.zsh

cd blog/.vuepress/dist

echo 'amaljoyc.com' > CNAME

git init
git add -A

latest_commit=`git rev-parse HEAD | head -c 10`
echo "deploy $latest_commit"
git commit -m 'deploy $latest_commit'

git push -f git@github.com:amaljoyc/amaljoyc.github.io.git master

cd -