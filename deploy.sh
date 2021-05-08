#!/usr/bin/env sh

set -e

latest_commit=`git rev-parse HEAD | head -c 10`

# npm run blog:build
yarn build

cd blog/.vuepress/dist

echo 'amaljoyc.com' > CNAME

git init
git add -A

echo "deploy $latest_commit"
git commit -m "deploy $latest_commit"

git push -f git@github.com:amaljoyc/amaljoyc.github.io.git master

cd -