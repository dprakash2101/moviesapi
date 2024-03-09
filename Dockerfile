# Use a base image with the latest Node.js LTS installed
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies using npm ci
RUN npm ci --only=production

# Copy the rest of the application code to the working directory
COPY src ./src

# Copy tsconfig.json to the working directory
COPY tsconfig.json ./
RUN npm install -g nodemon

# If you're running the application in development, use ts-node
# Otherwise, transpile TypeScript to JavaScript
RUN npm install -g typescript
RUN if [ "$NODE_ENV" = "development" ]; then npm install -g ts-node; else npm run build; fi

# Expose port 3000
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
