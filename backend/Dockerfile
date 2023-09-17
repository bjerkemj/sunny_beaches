# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend application to the container
COPY . .

# Expose the port your backend application listens on
EXPOSE 3001

# Command to run your backend application
CMD ["node", "app.js"]
