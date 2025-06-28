# Step 1: Build React app
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build the app (uses .env at build time)
RUN npm run build

# Step 2: Serve app
FROM node:20-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built React app
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 3000

# Serve production build
CMD ["serve", "-s", "build", "-l", "3000"]
