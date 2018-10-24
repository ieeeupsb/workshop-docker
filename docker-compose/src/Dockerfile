# this tells docker to base our image on the official node image, version 10
FROM node:10
# tells docker which folder to put our code on and run our commands from
WORKDIR /usr/src/app 
#copy the package.json file we wrote to the WORKDIR on the image
COPY package.json . 
#tells docker to install our dependencies to the image as it is built
RUN npm install 
#copies our application code into the container.
COPY server.js . 
#this is the port our application will be served on
EXPOSE 3000  
#default command to be run when a container is started with this image.
CMD npm run start 
