# ANUS-DREAMS Bridge User Guide

Welcome to the ANUS-DREAMS Bridge User Guide! This document will help you get started with the bridge and learn how to create advanced blockchain agents.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
  - [Contexts](#contexts)
  - [Actions](#actions)
  - [Integration Flow](#integration-flow)
- [Creating Agents](#creating-agents)
  - [Basic Agent](#basic-agent)
  - [Specialized Agents](#specialized-agents)
  - [Custom Capabilities](#custom-capabilities)
- [Examples](#examples)
  - [Cross-chain Analysis](#cross-chain-analysis)
  - [DeFi Portfolio Management](#defi-portfolio-management)
  - [NFT Collection Analysis](#nft-collection-analysis)
- [Advanced Usage](#advanced-usage)
  - [Custom Actions](#custom-actions)
  - [Custom Contexts](#custom-contexts)
  - [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)
  - [Common Issues](#common-issues)
  - [Debugging](#debugging)

## Introduction

The ANUS-DREAMS Bridge connects two powerful frameworks:

1. **ANUS AI**: Advanced blockchain tools for Web3 operations
2. **Daydreams**: A React-like framework for building AI agents

By combining these frameworks, you can create sophisticated agents that can interact with blockchain networks, analyze data, and execute strategies across multiple chains.

## Installation

Install the package from npm:

```bash
npm install anus-dreams-bridge
```

Or clone the repository:

```bash
git clone https://github.com/yourusername/anus-dreams-bridge.git
cd anus-dreams-bridge
npm install
```

## Quick Start

Create a basic agent:

```typescript
import { createAnusDreamsAgent } from 'anus-dreams-bridge';
import { groq } from '@daydreamsai/core/models';
import { cli } from '@daydreamsai/core/extensions';

// Create an agent
const agent = createAnusDreamsAgent({
  model: groq("deepseek-r1-distill-llama-70b"),
  extensions: [cli]
});

// Start the agent
agent.start();
```

This will create a Web3 agent with the CLI extension that can interact with multiple blockchain networks.

## Core Concepts

### Contexts

Contexts in Daydreams are like React components - they manage state and render their data to the LLM. The bridge provides several contexts:

- **blockchainContext**: Manages blockchain network state
- **walletContext**: Manages wallet balances and transactions
- **defiContext**: Manages DeFi protocol data
- **nftContext**: Manages NFT collection data
- **crossChainContext**: Manages cross-chain analysis

Each context has:
- A schema that defines its parameters
- A key function to generate unique identifiers
- A create function to initialize state
- A render function to format data for the LLM

### Actions

Actions in Daydreams are functions that the LLM can call to interact with external systems. The bridge maps ANUS AI tools to Daydreams actions:

- **connectBlockchainAction**: Connect to a blockchain network
- **getWalletBalanceAction**: Get wallet balances
- **getDeFiProtocolDataAction**: Get DeFi protocol data
- **getNFTCollectionDataAction**: Get NFT collection data
- **analyzeCrossChainOpportunitiesAction**: Analyze cross-chain opportunities
- **executeCrossChainPlanAction**: Execute a cross-chain plan
- **monitorBlockchainAction**: Monitor blockchain events

Each action:
- Has a name and description
- Defines its parameters with a Zod schema
- Includes a handler function
- Updates the appropriate context's state

### Integration Flow

The integration flow works like this:

1. The LLM receives context from various blockchain data sources
2. It decides to call an action based on the user's request
3. The action calls the corresponding ANUS AI tool
4. The tool performs the blockchain operation
5. The action updates the relevant context
6. The updated context is rendered in the next LLM prompt

This creates a closed loop where the agent can reason about blockchain data and take actions based on that reasoning.

## Creating Agents

### Basic Agent

The simplest way to create an agent is using the `createAnusDreamsAgent` function:

```typescript
import { createAnusDreamsAgent } from 'anus-dreams-bridge';
import { groq } from '@daydreamsai/core/models';
import { cli } from '@daydreamsai/core/extensions';

const agent = createAnusDreamsAgent();
agent.start();
```

This creates an agent with:
- Default LLM model (deepseek-r1-distill-llama-70b)
- CLI extension for terminal interaction
- All standard blockchain contexts and actions

### Specialized Agents

You can create specialized agents by customizing the configuration:

```typescript
const agent = createAnusDreamsAgent({
  model: groq("deepseek-r1-distill-llama-70b"),
  extensions: [cli],
  systemMessage: `
You are a DeFi expert specialized in yield optimization strategies.
Help users find the highest yield opportunities across multiple blockchain networks.
Always explain the risks associated with each strategy.
  `
});
```

The `systemMessage` property is especially important as it defines the agent's personality and expertise.

### Custom Capabilities

You can extend the agent with custom capabilities by adding your own contexts and actions:

```typescript
import { createAnusDreamsAgent } from 'anus-dreams-bridge';
import { context, action } from '@daydreamsai/core';
import { z } from 'zod';

// Define a custom context
const myCustomContext = context({
  type: 'custom-context',
  schema: z.object({ id: z.string() }),
  key({ id }) { return id; },
  create() { return { data: [] }; },
  render({ memory }) { return `Custom data: ${JSON.stringify(memory.data)}`; }
});

// Define a custom action
const myCustomAction = action({
  name: 'myCustomAction',
  description: 'Perform a custom operation',
  schema: z.object({ param: z.string() }),
  handler(call, ctx) {
    ctx.agentMemory.data.push(call.data.param);
    return { success: true };
  }
});

// Create agent with custom capabilities
const agent = createAnusDreamsAgent({
  contexts: [myCustomContext],
  actions: [myCustomAction]
});
```

## Examples

### Cross-chain Analysis

This example demonstrates how to analyze opportunities across multiple blockchain networks:

```typescript
// Create the agent
const agent = createAnusDreamsAgent({
  systemMessage: "You are a cross-chain analyst specializing in arbitrage opportunities."
});

// Start the agent
agent.start();

// Sample conversation:
// User: Find arbitrage opportunities between Ethereum and Arbitrum
// Agent: Let me analyze the price differences...
// [Agent connects to both networks and checks prices]
// Agent: I found a 0.5% arbitrage opportunity for ETH/USDC...
```

The agent will:
1. Connect to both networks
2. Analyze price differences
3. Identify profitable opportunities
4. Present the findings with expected returns

### DeFi Portfolio Management

This example shows how to create a DeFi portfolio management agent:

```typescript
// Create the agent
const agent = createAnusDreamsAgent({
  systemMessage: "You are a DeFi portfolio manager helping users optimize their yield."
});

// Start the agent
agent.start();

// Sample conversation:
// User: Check my positions on Aave
// Agent: I'll analyze your Aave positions...
// [Agent retrieves wallet and protocol data]
// Agent: You have 5 ETH supplied at 1.2% APY and 5,000 USDC borrowed at 3.5% APR...
```

The agent will:
1. Get wallet information
2. Check DeFi protocol positions
3. Calculate current yields
4. Recommend optimization strategies

### NFT Collection Analysis

This example demonstrates NFT collection analysis:

```typescript
// Create the agent
const agent = createAnusDreamsAgent({
  systemMessage: "You are an NFT analyst specializing in collection evaluation."
});

// Start the agent
agent.start();

// Sample conversation:
// User: Analyze the Bored Ape Yacht Club collection
// Agent: I'll gather data about BAYC...
// [Agent retrieves collection data]
// Agent: BAYC has 10,000 NFTs with a floor price of 30 ETH...
```

The agent will:
1. Gather collection metadata
2. Check floor prices and sales volume
3. Identify rarity patterns
4. Provide investment recommendations

## Advanced Usage

### Custom Actions

Create custom actions to extend the agent's capabilities:

```typescript
import { action } from '@daydreamsai/core';
import { z } from 'zod';

const customTradeAction = action({
  name: 'executeTrade',
  description: 'Execute a trade on a DEX',
  schema: z.object({
    dex: z.string().describe('DEX name'),
    tokenIn: z.string().describe('Token to sell'),
    tokenOut: z.string().describe('Token to buy'),
    amountIn: z.number().describe('Amount to sell')
  }),
  async handler(call, ctx, agent) {
    // Implementation details...
    
    // Update context
    ctx.agentMemory.trades.push({
      dex: call.data.dex,
      tokenIn: call.data.tokenIn,
      tokenOut: call.data.tokenOut,
      amountIn: call.data.amountIn,
      timestamp: new Date().toISOString()
    });
    
    return {
      success: true,
      message: `Executed trade of ${call.data.amountIn} ${call.data.tokenIn} for ${call.data.tokenOut}`
    };
  }
});

// Use your custom action
const agent = createAnusDreamsAgent({
  actions: [customTradeAction]
});
```

### Custom Contexts

Create custom contexts to manage specialized state:

```typescript
import { context } from '@daydreamsai/core';
import { z } from 'zod';

const tradingContext = context({
  type: 'trading',
  schema: z.object({
    userId: z.string().describe('User ID'),
    strategy: z.string().describe('Trading strategy')
  }),
  key({ userId }) {
    return userId;
  },
  create(state) {
    return {
      userId: state.userId,
      strategy: state.strategy,
      trades: [],
      pnl: 0,
      lastUpdated: new Date().toISOString()
    };
  },
  render({ memory }) {
    const trades = memory.trades
      .map(t => `- ${t.tokenIn} → ${t.tokenOut} on ${t.dex}`)
      .join('\n');
    
    return `
# Trading Account for ${memory.userId}
Strategy: ${memory.strategy}
P&L: ${memory.pnl}%

## Recent Trades
${trades || 'No recent trades'}

Last Updated: ${memory.lastUpdated}
    `;
  }
});

// Use your custom context
const agent = createAnusDreamsAgent({
  contexts: [tradingContext]
});
```

### Environment Configuration

Configure the bridge using environment variables:

```bash
# .env file
GROQ_API_KEY=your_api_key
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your_key
MEMORY_PERSISTENCE_PATH=./data/memory
```

Access environment variables in your code:

```typescript
import { BridgeConfig } from 'anus-dreams-bridge';

console.log(`Using RPC URL: ${BridgeConfig.getRpcUrl('ethereum')}`);
console.log(`Memory path: ${BridgeConfig.memoryPath}`);
```

## Troubleshooting

### Common Issues

**Issue: Agent can't connect to blockchain networks**

Check that you've set the appropriate RPC URLs in your environment:
```bash
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your_key
```

**Issue: LLM API errors**

Ensure you've set the appropriate API keys:
```bash
GROQ_API_KEY=your_groq_api_key
```

**Issue: Memory persistence errors**

Make sure the memory directory exists:
```bash
mkdir -p data/memory
```

**Issue: Agent doesn't understand blockchain concepts**

Try using a more capable model or providing more explicit instructions in the system message.

### Debugging

Enable verbose logging to debug issues:

```bash
# .env file
BRIDGE_LOG_LEVEL=debug
ANUS_AI_LOG_LEVEL=debug
DAYDREAMS_LOG_LEVEL=debug
EVENT_BUS_LOG_LEVEL=debug
```

You can also add custom logging in your code:

```typescript
import { action } from '@daydreamsai/core';
import { z } from 'zod';

const debugAction = action({
  name: 'debug',
  description: 'Print debug information',
  schema: z.object({}),
  handler(call, ctx) {
    console.log('Current context:', ctx.agentMemory);
    return { success: true };
  }
});
```

For more detailed troubleshooting, check the [API Reference](api-reference.md).
