/**
 * ANUS-DREAMS Bridge - NFT Collection Analyzer Example
 * 
 * This example shows how to create and run a specialized agent for
 * NFT collection analysis using the ANUS-DREAMS bridge.
 */

import { createAnusDreamsAgent } from '../index';
import { groq } from '@daydreamsai/core/models';
import { cli } from '@daydreamsai/core/extensions';

async function runNftAnalyzer() {
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

Workflow for NFT analysis:
1. Ask which NFT collection the user wants to analyze
2. Gather collection data including floor price, total supply, and rarity distribution
3. If the user has a wallet address, check for owned NFTs in the collection
4. Analyze the collection's market trends and value prospects
5. Provide insights on specific NFTs or recommend investment strategies

Always provide detailed analysis with evidence to support your recommendations.
Include specific data points like floor price, sales volume, and rarity percentages.
    `
  });
  
  // Start the agent
  console.log("Starting agent...");
  agent.start({
    cli: {
      prompt: "nft-analyzer> ",
      welcome: "Welcome to the NFT Collection Analyzer! I can help you evaluate NFT collections, track prices, and find opportunities. Which collection would you like to analyze today?"
    }
  });
  
  console.log("NFT Collection Analyzer is now running!");
}

// Run if this file is executed directly
if (require.main === module) {
  runNftAnalyzer().catch(console.error);
}

// Export for use in index.ts
export default runNftAnalyzer;
