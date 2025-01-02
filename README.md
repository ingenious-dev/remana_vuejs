# REMANA VUEJS FRONTEND

![N|Solid](./REMANA-logo.png)

Building a `RE`lationship `MANA`gement frontend using [Vue.js](https://vuejs.org/).

This is the frontend for both the `XANO`/`Express JS` API Service. The code for the `Express JS` backend can be found on the following link:   
https://github.com/ingenious-dev/remana_expressjs

## Development setup
To setup a dev environment for coding, clone the repository and then run `npm install` to get the needed dependencies.

## Running with Docker
### Docker Compose
For testing, a docker container is included in the repository. To build and run the container make sure you have docker installed for your OS. Then build and start the docker container using this command:
```
docker-compose up -d
```

The `XANO` powered frontend can be access on `http://localhost:80` and the `Express JS` powered frontend can be access on `http://localhost:81`.

Lastly remember to start the Express JS API Service before running the docker command, as the `Express JS` powered frontend requires it.