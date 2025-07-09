# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies for multiple languages
RUN apk update && \
    apk add --no-cache \
    g++ \
    gcc \
    openjdk11 \
    python3 \
    py3-pip

# Set default Python version to Python 3
RUN ln -sf /usr/bin/python3 /usr/bin/python

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application runs on
# EXPOSE 3000
EXPOSE 3002

# Command to run the application
CMD ["node", "index.js"]
