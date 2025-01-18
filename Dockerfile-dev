# Use Node.js as the base image
FROM node:22.12.0-alpine as builder

# Set working directory
WORKDIR /UnifiedAppAdminFrontend

# Copy package files
COPY package*.json ./

#Run a clean install of the dependencies
RUN npm install -g npm@11.0.0

RUN npm cache clear --force

RUN npm install

RUN npm install @angular/cli@19.0.6 --force

# Copy project files
COPY . .

#Run a clean install of the dependencies
RUN npm install

# Build the Angular app
RUN npm run build --configuration=dev

# Use Nginx to serve the application
FROM nginx:alpine

#Copy the build output to replace the default nginx contents.
COPY --from=builder /UnifiedAppAdminFrontend/dist/UnifiedAppAdminFrontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80