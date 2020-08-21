FROM nginx:latest

# Make misc directories for volume mounting
RUN mkdir -p /opt/certs
RUN mkdir -p /etc/letsencrypt

# Copy the website build
COPY dist/oresat-paws/ /usr/share/nginx/html

# Copy the custom NGINX config
# COPY nginx.conf /etc/nginx/

# EXPOSE 1032

CMD service nginx start
