echo "打包 => dist";

npm run build;

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