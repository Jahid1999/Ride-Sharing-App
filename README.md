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


