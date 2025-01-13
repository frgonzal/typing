# Use Node.js as the base image
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies and build the application
RUN npm install
RUN npm run build

# Use a minimal image for production
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy necessary files from the builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/public ./public

# Install production dependencies
RUN npm install --production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
