

#
# Node.js w/ Bower & Grunt Dockerfile
#
# https://github.com/dockerfile/nodejs-bower-grunt
#

# Pull base image.
FROM readytalk/nodejs

# Add application to
RUN mkdir -p /app/
WORKDIR /app
COPY . ./

# Install Bower & Grunt
RUN npm install -g bower grunt-cli


RUN npm install

# Define working directory.

EXPOSE 8080

# Define default command.
CMD ["node","server/app.js"]
