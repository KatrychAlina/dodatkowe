# Stage 1: Build stage
FROM node:14-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the application files
COPY package*.json .
COPY server.js .


# Install dependencies
RUN npm install

# Stage 2: Runtime stage
FROM node:14-alpine AS runtime

# Set the working directory
WORKDIR /app

# Copy the application files from the build stage
COPY --from=build /app .

# Add information about server startup to the log file
RUN echo "$(date) - Serwer został uruchomiony." >> logs.txt

# Set the application port
ENV PORT=3000

# Add application health check
HEALTHCHECK --interval=30s CMD curl -f http://localhost:${PORT}/health || exit 1

# Start the server
CMD ["node", "server.js"]

