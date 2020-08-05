echo "设置 npm config set registry http://registry.npmjs.org"

npm config set registry http://registry.npmjs.org

echo "打包 => dist";

# 打包 => dist
npm run build;

echo "打包 插件lib";

# 打包 插件
npm run lib;

echo "推送到npmjs";

#推送到npmjs
npm publish;

echo "设置 npm config set registry https://registry.npm.taobao.org"

npm config set registry https://registry.npm.taobao.org

# 更新gh-pages
echo "更新gh-pages";

git branch -D gh-pages;

echo "删除gh-pages";

git checkout -b gh-pages;

echo "创建并切换到gh-pages";

git add -f dist;

git commit -m 'create gh-pages';

git push origin -d gh-pages;

git subtree push --prefix dist origin gh-pages;

echo "已推送gh-pages";

# 推送完成后切换回master
git checkout master; 

echo "切换回master";

git add .;

git commit -m "更新lib包";

git pull;

git push;

echo "完成";