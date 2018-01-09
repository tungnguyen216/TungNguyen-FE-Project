########### RUN WEB APP ##############
========================================================
Firstly, we need Nodejs to set up local server  or build dependencies. if you haven't already installed Node.js, visit the site below and lay it down
https://nodejs.org/en/download/

I. RUN WEB BY BUILDING "DEVELOPED SOURCE"
--------------------------------------------------------

1. Go to web's root folder, open terminal and run command:
	"npm install"
to build web dependencies. It will take some minutes.

2. Run "gulp" to build web and run webserver.


II. RUN WEB FROM "BUILT FOLDER"
--------------------------------------------------------

1. Install local server: open terminal and run command:
	"npm install http-server -g"

2. Go to folder: "/build",
  run command: "http-server"
  
  Then we will see the result like:
"Starting up http-server, serving ./                                                                                     Available on:                                                                                                       http://192.168.1.15:8080                                                                                            http://127.0.0.1:8080                                                                                           Hit CTRL-C to stop the server"

3. Use one of that links to run the web app.
