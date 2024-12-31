# Deploying with Docker

## Version 1
This version did not account for non-file (routing is handled by JS instead of the route being an actual file on disk) routing of the vue-js application    
https://hub.docker.com/_/nginx

## Version 2
The version address the routing issue of `version 1`.   
https://medium.com/@prasunamudawari/deploying-a-vue-js-application-with-docker-and-nginx-387fef1a27f2
https://stackoverflow.com/questions/47655869/how-to-use-vue-js-with-nginx/47656569#47656569
https://router.vuejs.org/guide/essentials/history-mode.html#nginx
https://redis.io/learn/operate/docker/nodejs-nginx-redis

# Version 3 (IN USE)
In addition to `version 2` this version includes the building stage. Hence different versions can be built by altering environment variables in the Dockerfiles
https://medium.com/@prasunamudawari/deploying-a-vue-js-application-with-docker-and-nginx-387fef1a27f2
https://docs.docker.com/reference/compose-file/build/#illustrative-example
https://stackoverflow.com/questions/43747776/copy-with-docker-but-with-exclusion/43747867#43747867