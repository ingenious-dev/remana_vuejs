https://hub.docker.com/_/nginx
docker build -t remana-vuejs-nginx .
docker run --name remana-vuejs -d -p 80:80 remana-vuejs-nginx