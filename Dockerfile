#stage 1

#Step 1: Use Node.js 20 image to build the Angular app
FROM node:20 AS build

#Set the working directory inside the container
WORKDIR /app

#Copy the package.json and package-lock.json 
COPY package*.json ./

#install dependencies 
RUN npm install

#Copy the rest of the Angular application code
COPY . .

#build the Angular app for production
RUN npm run build -- --configuration production

#stage 2

#step 2: Use an official Nginx image to serve the Angular app
FROM nginx:alpine

#Copy the Angular build output form the previous step to the Nginx container
COPY --from=build /app/dist/revspeed-1 /usr/share/nginx/html

#expose the default Nginx port 
EXPOSE 80

#start Nginx server             
CMD ["nginx","-g","daemon off;"]