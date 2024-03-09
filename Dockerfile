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

# Compile TypeScript code
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the app (assuming your entry point is dist/app.js after building)
CMD ["node", "./dist/app.js"]
