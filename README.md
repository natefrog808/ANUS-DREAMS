# ANUS-DREAMS Bridge

This project provides integration between ANUS AI (Advanced Neuro-Unified System) and Daydreams, enabling seamless operation between ANUS AI's blockchain tools and Daydreams' React-like architecture.

## Overview

The ANUS-DREAMS Bridge adapts the ANUS AI framework's powerful blockchain tools to work with Daydreams' intuitive context-action model. This integration allows you to create sophisticated Web3 agents that can:

- Connect to multiple blockchain networks
- Analyze wallet balances and transactions
- Get data from DeFi protocols and NFT collections
- Identify cross-chain opportunities
- Execute strategies across blockchains
- Monitor and respond to on-chain events

## Architecture

The bridge works by mapping ANUS AI tools to Daydreams actions and creating contextual memory stores that match Daydreams' stateful architecture:

```
┌───────────┐          ┌───────────────┐           ┌──────────┐
│           │          │               │           │          │
│  ANUS AI  │───────▶ │ ANUS-DREAMS   │──────────▶│ Daydreams│
│  Tools    │          │     Bridge    │           │  Agent   │
│           │◀─────────│               │◀──────────│          │
└───────────┘          └───────────────┘           └──────────┘
```

### Key Components

- **Daydreams Contexts**: Blockchain, Wallet, DeFi, NFT, and Cross-Chain contexts that manage state
- **Daydreams Actions**: Functions that map to ANUS AI tools for blockchain operations
- **Integration Layer**: Adapters that translate between the two frameworks

## Installation

```bash
# Install dependencies
npm install @daydreamsai/core

# Copy the bridge files to your project
cp anus-dreams-bridge.ts ./src/
```

## Usage

```typescript
import { createAnusDreamsAgent } from './anus-dreams-bridge';
import { groq } from '@daydreamsai/core/models';
import { cli } from '@daydreamsai/core/extensions';

// Create an ANUS-DREAMS integrated agent
const agent = createAnusDreamsAgent({
  model: groq("deepseek-r1-distill-llama-70b"),
  extensions: [cli]
});

// Start the agent
agent.start();
```

## Example Agents

The project includes several example agents:

- **Cross-chain Analyst**: Identifies opportunities across multiple blockchains
- **DeFi Portfolio Manager**: Optimizes yield and manages DeFi positions
- **NFT Collection Analyzer**: Evaluates NFT collections and tracks trends

Run an example:

```bash
# Run the cross-chain analyst
npm run agent:crosschain

# Run the DeFi portfolio manager
npm run agent:defi

# Run the NFT collection analyzer
npm run agent:nft
```

## Available Contexts

| Context | Purpose | Properties |
|---------|---------|------------|
| `blockchain` | Blockchain network state | network, blockNumber, gasPrice, status |
| `wallet` | Wallet balances and transactions | address, network, balance, transactions |
| `defi` | DeFi protocol data | protocol, network, pools, userPositions, metrics |
| `nft` | NFT collection information | collection, network, items, ownedItems, floorPrice |
| `crossChain` | Cross-chain analysis | chains, chainData, opportunities, analysis |

## Available Actions

| Action | Purpose | Parameters |
|--------|---------|------------|
| `connectBlockchain` | Connect to a blockchain network | network |
| `getWalletBalance` | Get the balance of a wallet | address, network, includeTokens |
| `getDeFiProtocolData` | Get data for a DeFi protocol | protocol, network |
| `getNFTCollectionData` | Get data for an NFT collection | collection, network |
| `analyzeCrossChainOpportunities` | Analyze opportunities across chains | chains, strategy, minProfitPercent |
| `executeCrossChainPlan` | Execute a plan across blockchains | opportunity, dryRun |
| `monitorBlockchain` | Monitor a blockchain for events | network, eventTypes, duration |

## Context-Action Integration

The bridge ensures that actions update the appropriate contexts, maintaining coherent state:

- `connectBlockchain` updates the `blockchain` context with network status
- `getWalletBalance` updates the `wallet` context with balance information
- `getDeFiProtocolData` updates the `defi` context with protocol data
- `getNFTCollectionData` updates the `nft` context with collection information
- `analyzeCrossChainOpportunities` updates the `crossChain` context with opportunities
- `executeCrossChainPlan` records execution results in the `crossChain` context
- `monitorBlockchain` stores events in the `blockchain` context

## Example Conversations

Here are some example conversations with the agents:

### Cross-chain Analyst

```
User: I want to find arbitrage opportunities between Ethereum and Arbitrum.

Agent: I'll help you find arbitrage opportunities between Ethereum and Arbitrum. Let me connect to both networks and analyze the data.

[Agent connects to Ethereum and Arbitrum networks and analyzes price differences]

I've found 2 potential arbitrage opportunities:
1. ETH/USDC: 0.5% price difference (Ethereum: $2500, Arbitrum: $2512.50)
2. WBTC/ETH: 0.3% price difference

The best opportunity is ETH/USDC with an expected profit of 0.5% after gas costs.

Would you like me to execute this opportunity or provide more details?
```

### DeFi Portfolio Manager

```
User: What's my current position in Aave on Ethereum?

Agent: Let me check your Aave positions on Ethereum.

[Agent retrieves wallet and protocol data]

You currently have the following positions in Aave on Ethereum:
- Supplied: 5 ETH ($12,500) at 1.2% APY
- Borrowed: 5,000 USDC ($5,000) at 3.5% APR

Your health factor is 2.1, which is healthy (above 1.0).
Your net APY is approximately -0.55%.

Would you like recommendations to improve your yield?
```

## Customization

You can customize the agent by providing additional configuration:

```typescript
const agent = createAnusDreamsAgent({
  // Use a different model
  model: groq("custom-model-name"),
  
  // Add additional extensions
  extensions: [cli, webApi],
  
  // Add custom contexts
  contexts: [myCustomContext],
  
  // Add custom actions
  actions: [myCustomAction],
  
  // Customize the system message
  systemMessage: "Your custom system message here"
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
