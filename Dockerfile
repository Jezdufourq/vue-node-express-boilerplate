FROM node:latest

# client files
COPY ./client /client
WORKDIR /client
RUN yarn
RUN yarn global add @quasar/cli
RUN quasar build
COPY ./server /server
WORKDIR /server
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]



# COPY ./docker/entrypoint.sh /entrypoint/

#     # Changing permissions so that you can access this file
# RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

# # server files

# COPY ./docker/entrypoint.sh /entrypoint/

#     # Changing permissions so that you can access this file
# RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

# # Copying the current director to a directory named 'src' on the docker image
# COPY . /src

# # Copy or mount node app here
# WORKDIR /src/

# EXPOSE 8080

# ENTRYPOINT ["/entrypoint/entrypoint.sh"]

# CMD ["npm", "start"]