/**
 * ANUS-DREAMS Bridge - Cross-chain Analyst Example
 * 
 * This example shows how to create and run a specialized agent for
 * cross-chain analysis using the ANUS-DREAMS bridge.
 */

import { createAnusDreamsAgent } from '../index';
import { groq } from '@daydreamsai/core/models';
import { cli } from '@daydreamsai/core/extensions';

async function runCrosschainAnalyst() {
  console.log("Starting Cross-chain Analyst Agent...");
  
  // Create an agent specialized for cross-chain analysis
  const agent = createAnusDreamsAgent({
    // Configure the base LLM 
    model: groq("deepseek-r1-distill-llama-70b"),
    
    // Use CLI extension for terminal interaction
    extensions: [cli],
    
    // Customize the system message for this specific use case
    systemMessage: `
You are a Cross-chain Analyst agent specialized in finding profitable opportunities across
multiple blockchain networks. You have deep knowledge of DeFi protocols, token prices,
NFT collections, and cross-chain bridges.

Your goal is to identify the most profitable opportunities for users based on their risk tolerance
and available assets. You can analyze multiple chains simultaneously and recommend specific
actions to take advantage of price differences, yield opportunities, and efficient bridges.

Workflow for analyzing cross-chain opportunities:
1. Ask which blockchain networks the user is interested in analyzing
2. Connect to those networks to gather current data
3. Analyze opportunities (arbitrage, yield, or bridge efficiency)
4. Present findings with expected returns and risk levels
5. If requested, provide execution steps or perform a dry run

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
    // Configuration for the CLI extension
    cli: {
      prompt: "cross-chain-analyst> ",
      welcome: "Welcome to the Cross-chain Analyst Agent! I can help you find profitable opportunities across multiple blockchain networks. Which chains would you like to analyze today?"
    }
  });
  
  console.log("Agent is now running!");
}

// Run if this file is executed directly
if (require.main === module) {
  runCrosschainAnalyst().catch(console.error);
}

// Export for use in index.ts
export default runCrosschainAnalyst;
