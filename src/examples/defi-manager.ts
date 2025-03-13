/**
 * ANUS-DREAMS Bridge - DeFi Portfolio Manager Example
 * 
 * This example shows how to create and run a specialized agent for
 * DeFi portfolio management using the ANUS-DREAMS bridge.
 */

import { createAnusDreamsAgent } from '../index';
import { groq } from '@daydreamsai/core/models';
import { cli } from '@daydreamsai/core/extensions';

async function runDefiManager() {
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

Workflow for portfolio management:
1. First ask for the user's wallet address and networks they're active on
2. Analyze the wallet's current positions and balances
3. Calculate key metrics like total value, current yield, and risk exposure
4. Provide a summary of the portfolio's current state
5. Offer specific recommendations for improvement based on the user's goals

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
      welcome: "Welcome to your DeFi Portfolio Manager! I can help optimize your yield and manage risk across different protocols. To get started, please share your wallet address and which networks you're active on."
    }
  });
  
  console.log("DeFi Portfolio Manager is now running!");
}

// Run if this file is executed directly
if (require.main === module) {
  runDefiManager().catch(console.error);
}

// Export for use in index.ts
export default runDefiManager;
