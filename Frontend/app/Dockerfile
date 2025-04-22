# # Step 1: Build React app
# FROM node:18 AS build

# # Set working directory
# WORKDIR /app

# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy rest of the source code
# COPY . .

# # Build the React app for production
# RUN npm run build

# # Step 2: Serve app with Nginx
# # FROM nginx:alpine

# # Copy built app to Nginx's public folder
# # COPY --from=build /app/build /usr/share/nginx/html

# # Optional: Custom Nginx config for SPA routing (like React Router)
# # COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80 and run Nginx
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


######## Novo


# Step 1: Build React app
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install




# Copy source code and build app
COPY . .
RUN npm run build

# Step 2: Serve with 'serve'
FROM node:18

WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy built React app from previous stage
COPY --from=build /app/build ./build

# Expose the port React will run on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]
