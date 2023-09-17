# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of your frontend application to the container
COPY . .

# Expose the port your frontend application listens on (default is 8080 for http-server)
EXPOSE 8080

# Command to run your frontend application using http-server
CMD ["npx", "http-server", "-p", "8080"]
