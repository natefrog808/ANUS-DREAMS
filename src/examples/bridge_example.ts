/**
 * ANUS-DREAMS Bridge - Usage Example
 * 
 * This file demonstrates how to use the ANUS-DREAMS bridge
 * to create and run an agent with advanced blockchain capabilities.
 */

import { createAnusDreamsAgent } from './anus-dreams-bridge';
import { groq } from '@daydreamsai/core/models';
import { cli, webApi } from '@daydreamsai/core/extensions';

async function runCrosschainAnalystAgent() {
  console.log("Starting Cross-chain Analyst Agent...");
  
  // Create an agent specialized for cross-chain analysis
  const agent = createAnusDreamsAgent({
    // Configure the base LLM 
    model: groq("deepseek-r1-distill-llama-70b"),
    
    // Add both CLI and web API extensions
    extensions: [cli, webApi],
    
    // Customize the system message for this specific use case
    systemMessage: `
You are a Cross-chain Analyst agent specialized in finding profitable opportunities across
multiple blockchain networks. You have deep knowledge of DeFi protocols, token prices,
NFT collections, and cross-chain bridges.

Your goal is to identify the most profitable opportunities for users based on their risk tolerance
and available assets. You can analyze multiple chains simultaneously and recommend specific
actions to take advantage of price differences, yield opportunities, and efficient bridges.

Always explain your reasoning clearly and provide step-by-step instructions for any recommendations.
    `
  });
  
  // Log agent initialization
  console.log("Agent initialized with cross-chain analysis capabilities");
  console.log("Available contexts:", agent.contexts.map(c => c.type).join(", "));
  console.log("Available actions:", agent.actions.map(a => a.name).join(", "));
  
  // Start the agent
  console.log("Starting agent...");
  agent.start({
    // Optional configuration for the CLI extension
    cli: {
      prompt: "cross-chain-analyst> ",
      welcome: "Welcome to the Cross-chain Analyst Agent! How can I help you find opportunities today?"
    },
    
    // Optional configuration for the web API extension
    webApi: {
      port: 3000,
      cors: true
    }
  });
  
  console.log("Agent is now running!");
  console.log("CLI: Interact directly in the terminal");
  console.log("Web API: Send requests to http://localhost:3000/api/chat");
  
  // The agent will continue running until terminated
}

async function runDeFiPortfolioManager() {
  console.log("Starting DeFi Portfolio Manager Agent...");
  
  // Create an agent specialized for managing DeFi portfolios
  const agent = createAnusDreamsAgent({
    model: groq("deepseek-r1-distill-llama-70b"),
    extensions: [cli],
    
    systemMessage: `
You are a DeFi Portfolio Manager agent specialized in helping users optimize their yield,
manage risk, and track performance across multiple DeFi protocols and blockchain networks.

Your capabilities include:
- Analyzing wallet balances and positions
- Calculating portfolio performance metrics
- Recommending yield optimization strategies
- Monitoring protocol risks and suggesting adjustments
- Executing portfolio rebalancing when requested

Always consider the user's risk tolerance and investment goals. Explain all recommendations
clearly, including potential risks and expected returns.
    `
  });
  
  // Log agent initialization
  console.log("DeFi Portfolio Manager initialized");
  
  // Start the agent
  console.log("Starting agent...");
  agent.start({
    cli: {
      prompt: "defi-manager> ",
      welcome: "Welcome to your DeFi Portfolio Manager! How can I help optimize your DeFi investments today?"
    }
  });
  
  console.log("DeFi Portfolio Manager is now running!");
}

async function runNFTCollectionAnalyzer() {
  console.log("Starting NFT Collection Analyzer Agent...");
  
  // Create an agent specialized for NFT analysis
  const agent = createAnusDreamsAgent({
    model: groq("deepseek-r1-distill-llama-70b"),
    extensions: [cli],
    
    systemMessage: `
You are an NFT Collection Analyzer agent specialized in evaluating NFT collections,
tracking floor prices, identifying rare attributes, and finding valuable opportunities.

Your capabilities include:
- Analyzing NFT collection metadata and statistics
- Tracking historical floor prices and sales volume
- Identifying rare traits and their value impact
- Comparing collections across different marketplaces
- Recommending buying or selling opportunities

Always provide detailed analysis with evidence to support your recommendations.
    `
  });
  
  // Start the agent
  console.log("Starting agent...");
  agent.start({
    cli: {
      prompt: "nft-analyzer> ",
      welcome: "Welcome to the NFT Collection Analyzer! What collections would you like to analyze today?"
    }
  });
  
  console.log("NFT Collection Analyzer is now running!");
}

// Run one of the example agents based on command line argument
async function main() {
  const agentType = process.argv[2] || 'crosschain';
  
  switch (agentType.toLowerCase()) {
    case 'crosschain':
      await runCrosschainAnalystAgent();
      break;
    case 'defi':
      await runDeFiPortfolioManager();
      break;
    case 'nft':
      await runNFTCollectionAnalyzer();
      break;
    default:
      console.log(`Unknown agent type: ${agentType}`);
      console.log("Available options: crosschain, defi, nft");
      process.exit(1);
  }
}

// Run the main function
if (require.main === module) {
  main().catch(console.error);
}
