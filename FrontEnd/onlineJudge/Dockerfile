# # Build stage
# FROM node:18-alpine as build

# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# # Serve stage
# FROM nginx:stable-alpine
# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve stage
FROM nginx:stable-alpine

# Copy the custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
