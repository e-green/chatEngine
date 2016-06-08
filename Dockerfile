

#
# Node.js w/ Bower & Grunt Dockerfile
#
# https://github.com/dockerfile/nodejs-bower-grunt
#

# Pull base image.
FROM dockerfile/nodejs

# Add application to
RUN mkdir -p /app/
WORKDIR . /app/
COPY . /app/

# Install Bower & Grunt
RUN npm install -g bower grunt-cli


RUN npm install

# Define working directory.
WORKDIR /app

EXPOSE 9000

# Define default command.
CMD ["grunt serve"]
