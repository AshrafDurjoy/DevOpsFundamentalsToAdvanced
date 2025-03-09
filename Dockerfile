FROM nginx:alpine
LABEL maintainer="DevOps Engineer"

# Copy demo content to nginx
RUN echo "<html><body><h1>GitHub Actions Docker Demo</h1><p>This is a demo container built with GitHub Actions</p></body></html>" > /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
