取消全局代理：
git config --global --unset http.proxy
git config --global --unset https.proxy

git config --global http.proxy 127.0.0.1:10809
git config --global https.proxy 127.0.0.1:10809

SET NODE_OPTIONS=--openssl-legacy-provider &&