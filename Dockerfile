FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY src/ ./src/
COPY scripts/ ./scripts/

# Create data directory
RUN mkdir -p data/memory

# Build the project
RUN npm run build

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/scripts ./scripts

# Install production dependencies only
RUN npm ci --production

# Create data directory
RUN mkdir -p data/memory

# Set environment variables
ENV NODE_ENV=production

# Expose port for web API
EXPOSE 3000

# Setup data directories and run the app
CMD ["npm", "start"]
