FROM nginx:latest

# Copy the built website to opt
COPY dist/oresat-paws/ /usr/share/nginx/html
