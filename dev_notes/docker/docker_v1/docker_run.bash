https://hub.docker.com/_/nginx
docker build -t remana-vuejs-nginx .
docker run --name remana-nginx -d remana-vuejs-nginx