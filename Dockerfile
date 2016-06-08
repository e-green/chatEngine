

#
# Node.js w/ Bower & Grunt Dockerfile
#
# https://github.com/dockerfile/nodejs-bower-grunt
#

# Pull base image.
FROM readytalk/nodejs

# Add application to
COPY .
RUN npm install

# Define working directory.

EXPOSE 8080

# Define default command.
CMD ["node", "/app/server/app.js"]
