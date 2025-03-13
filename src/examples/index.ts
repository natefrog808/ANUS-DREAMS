/**
 * ANUS-DREAMS Bridge - Examples Index
 * 
 * This file provides a central entry point for running the example agents.
 */

import runCrosschainAnalyst from './crosschain-analyst';
import runDefiManager from './defi-manager';
import runNftAnalyzer from './nft-analyzer';

/**
 * Run an example agent based on command line argument.
 */
async function runExample() {
  // Get the agent type from command line arguments
  // Default to 'crosschain' if not specified
  const agentType = process.argv[2] || 'crosschain';
  
  console.log(`Running ${agentType} example...`);
  
  switch (agentType.toLowerCase()) {
    case 'crosschain':
      await runCrosschainAnalyst();
      break;
    
    case 'defi':
      await runDefiManager();
      break;
    
    case 'nft':
      await runNftAnalyzer();
      break;
    
    default:
      console.error(`Unknown agent type: ${agentType}`);
      console.error('Available options: crosschain, defi, nft');
      process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  runExample().catch(error => {
    console.error('Error running example:', error);
    process.exit(1);
  });
}
