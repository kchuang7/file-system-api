FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm i

# Bundle app source
COPY . .

EXPOSE 8080
