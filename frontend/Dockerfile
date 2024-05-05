# Use an official Node.js runtime as the base image
FROM node:18.17.0-buster-slim AS build

# Set the working directory in the container
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV PUBLIC_URL /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining project files to the working directory
COPY . .

# Build the app
RUN npm run build

# Use nginx as the production server
FROM nginx:stable

# Copy the build output from the build stage to the NGINX document root
COPY --from=build /app/build /usr/share/nginx/html

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]