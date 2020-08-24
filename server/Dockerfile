# USE LINUX (UBUNTU)
# INSTALL NODE
# INSTALL EXPRESS
# INSTALL VUE
# INSTALL QUASAR
# RUN NPM INSTALL ON THE CURRENT DIRECTORY TO INSTALL ALL OF THE DEPENDECIES
FROM ubuntu:18.04

RUN apt update \
 && apt install -y \
    curl \
    gnupg \
    gcc \
    g++ \
    make \
 && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
 && apt install -y nodejs \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node app.js
EXPOSE 8081
