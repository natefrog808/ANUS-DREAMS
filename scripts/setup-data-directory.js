/**
 * Setup script for data directories
 * 
 * This script creates the necessary directory structure for
 * memory persistence and adds placeholder files to ensure
 * the directories are properly tracked in git.
 */

const fs = require('fs');
const path = require('path');

// Data directories to create
const directories = [
  'data/memory',
  'data/memory/blockchain',
  'data/memory/wallet',
  'data/memory/defi',
  'data/memory/nft',
  'data/memory/crosschain'
];

// Content for placeholder files
const placeholderContent = `# Data Directory
This directory is used for persistent storage by the ANUS-DREAMS Bridge.
Do not delete this directory or modify files directly unless you know what you're doing.
`;

// Create directories and placeholder files
directories.forEach(dir => {
  // Create directory if it doesn't exist
  const dirPath = path.resolve(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dirPath, { recursive: true });
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
  
  // Add placeholder file
  const placeholderPath = path.join(dirPath, '.gitkeep');
  if (!fs.existsSync(placeholderPath)) {
    console.log(`Creating placeholder: ${dir}/.gitkeep`);
    fs.writeFileSync(placeholderPath, placeholderContent);
  }
});

// Create README for the data directory
const readmePath = path.resolve(__dirname, '..', 'data', 'README.md');
const readmeContent = `# ANUS-DREAMS Bridge Data Directory

This directory contains persistent data used by the ANUS-DREAMS Bridge.

## Structure

- \`memory/\`: Persistent memory storage
  - \`blockchain/\`: Blockchain network state
  - \`wallet/\`: Wallet data and balances
  - \`defi/\`: DeFi protocol information
  - \`nft/\`: NFT collection data
  - \`crosschain/\`: Cross-chain analysis data

## Important Notes

- Do not delete these directories as they are required for the bridge to function properly
- Data in these directories is persisted between runs
- Each file is named according to the context instance key
- Files are automatically created and updated by the bridge

## Manual Management

While it's generally not recommended to manually edit these files, you can:

- Delete individual files to reset specific context instances
- Back up the entire directory before upgrading
- Inspect files to debug persistence issues

## Data Format

All data is stored in JSON format. Each file contains a serialized context object.
`;

if (!fs.existsSync(readmePath)) {
  console.log('Creating data directory README');
  fs.writeFileSync(readmePath, readmeContent);
}

console.log('Data directory setup complete!');
