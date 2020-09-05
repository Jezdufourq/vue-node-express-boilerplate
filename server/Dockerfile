FROM node:latest

COPY ./docker/entrypoint.sh /entrypoint/

# Changing permissions so that you can access this file
RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

# Copying the current director to a directory named 'src' on the docker image
COPY . /src

# Copy or mount node app here
WORKDIR /src/

EXPOSE 3000

ENTRYPOINT ["/entrypoint/entrypoint.sh"]

CMD ["npm", "start"]