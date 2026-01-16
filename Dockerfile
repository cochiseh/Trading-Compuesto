FROM nginx:alpine

# Copy web files
COPY . /usr/share/nginx/html

# Change Nginx config to listen on port 3000 instead of 80
# (Port 80 is often reserved by the EasyPanel proxy itself)
RUN sed -i 's/listen       80;/listen       3000;/' /etc/nginx/conf.d/default.conf

EXPOSE 3000
