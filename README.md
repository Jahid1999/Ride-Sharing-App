# Ride Sharing App

A repository for implementing a **Ride Sharing** app and to make it work as a **Distributed System** . It is a group project for academic purpose.

**Developers:**
		
   [Abdullah-Al-Jahid](https://github.com/Jahid1999) (BSSE 1030)


**Technology Used:** 

1.Node.js,

2.Express.js,

3.Socket.IO,

4.Node Schedule,

5.Http .

# Nginx Conf

server {

	listen 7000;
	
	listen [::]:7000;
	
	location /api {
		proxy_pass http://127.0.0.1:5000;
	}
	
	location /rating {
		proxy_pass http://127.0.0.1:5001;
	}

}

# Containarization

To **build** a docker image, go to the specific service folder and run the following command:

`sudo docker build -t <container-name>:latest .`

To **run** a cotainer/ docker image and bind run the following command:

`sudo docker run -p <host_port>:<container_port> <docker_image_name>`

**Changes in /etc/mongod.conf file:** 
For storing ratings  in mongodb located in host machine from container you have to change the `bindIp` to
`bindIp:0.0.0.0` from `bindIp:127.0.0.1`

# Docker Compose:

Hence, we added a docker compose, now we can build and run all the docker images by a single command.

To **build** all the docker images, go to the project folder and run `sudo docker-compose build` .

To **run** all the docker images, go to the project folder and run `sudo docker-compose up` .

# GEO Distributed:

**Fake DNS:** If you are on ubuntu go to `/etc/hosts` and add the fake domain namesas follows.

10.100.0.10 server.dhaka.com

10.100.0.20 server.chittagong.com

10.100.0.11 communication.dhaka.com

10.100.0.21 communication.chittagong.com

# Client

**Run:** node client.js .

`# Thank You`
 
