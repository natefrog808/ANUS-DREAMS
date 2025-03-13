# ANUS-DREAMS Bridge Makefile

.PHONY: setup build test lint docs start clean docker docker-docs

# Setup the project
setup:
	npm install
	npm run setup

# Build the project
build:
	npm run build

# Run tests
test:
	npm test

# Lint the project
lint:
	npm run lint

# Generate documentation
docs:
	npm run docs

# Start the agent
start:
	npm start

# Run the cross-chain analyst agent
agent-crosschain:
	npm run agent:crosschain

# Run the DeFi portfolio manager agent
agent-defi:
	npm run agent:defi

# Run the NFT collection analyzer agent
agent-nft:
	npm run agent:nft

# Clean build artifacts
clean:
	npm run clean

# Build and run Docker container
docker:
	docker-compose up -d anus-dreams-bridge

# Build and run documentation container
docker-docs:
	docker-compose up -d docs

# Build and run all containers
docker-all:
	docker-compose up -d

# Stop all containers
docker-stop:
	docker-compose down

# Show logs
logs:
	docker-compose logs -f

# Full setup and start
all: setup build docs start
