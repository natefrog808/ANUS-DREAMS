# ANUS-DREAMS Bridge API Reference

This document provides detailed API documentation for the ANUS-DREAMS Bridge.

## Table of Contents

- [Core API](#core-api)
  - [createAnusDreamsAgent](#createanusdreamsagent)
- [Contexts](#contexts)
  - [blockchainContext](#blockchaincontext)
  - [walletContext](#walletcontext)
  - [defiContext](#deficontext)
  - [nftContext](#nftcontext)
  - [crossChainContext](#crosschaincontext)
- [Actions](#actions)
  - [connectBlockchainAction](#connectblockchainaction)
  - [getWalletBalanceAction](#getwalletbalanceaction)
  - [getDeFiProtocolDataAction](#getdefiprotocoldataaction)
  - [getNFTCollectionDataAction](#getnftcollectiondataaction)
  - [analyzeCrossChainOpportunitiesAction](#analyzecrosschainopportunitiesaction)
  - [executeCrossChainPlanAction](#executecrosschainplanaction)
  - [monitorBlockchainAction](#monitorblockchainaction)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)

## Core API

### createAnusDreamsAgent

The main entry point for creating an ANUS-DREAMS integrated agent.

```typescript
function createAnusDreamsAgent(config?: AnusDreamsConfig): Agent;
```

#### Parameters

- `config` (optional): Configuration object for the agent
  - `model`: LLM model to use (defaults to groq("deepseek-r1-distill-llama-70b"))
  - `extensions`: Array of Daydreams extensions to use (defaults to [cli])
  - `contexts`: Additional contexts to include
  - `actions`: Additional actions to include
  - `systemMessage`: Custom system message for the agent

#### Returns

A Daydreams agent configured with ANUS AI integration.

#### Example

```typescript
import { createAnusDreamsAgent } from 'anus-dreams-bridge';
import { groq } from '@daydreamsai/core/models';
import { cli } from '@daydreamsai/core/extensions';

const agent = createAnusDreamsAgent({
  model: groq("deepseek-r1-distill-llama-70b"),
  extensions: [cli],
  systemMessage: "Custom instructions for the agent"
});

agent.start();
```

## Contexts

### blockchainContext

Context for blockchain network state.

#### Schema

```typescript
z.object({
  network: z.string().describe('Blockchain network name (e.g., ethereum, arbitrum)')
})
```

#### Key Function

Uses the network name as the key.

#### State Properties

- `network`: Blockchain network name
- `blockNumber`: Current block number
- `gasPrice`: Current gas price in gwei
- `status`: Connection status ('connected' or 'disconnected')
- `lastUpdated`: ISO timestamp of last update
- `recentBlocks`: Array of recent blocks

### walletContext

Context for blockchain wallet data.

#### Schema

```typescript
z.object({
  address: z.string().describe('Wallet address'),
  network: z.string().default('ethereum').describe('Blockchain network')
})
```

#### Key Function

Uses `${network}:${address}` as the key.

#### State Properties

- `address`: Wallet address
- `network`: Blockchain network
- `balance`: Object containing native and token balances
  - `native`: Native currency balance
  - `tokens`: Object mapping token symbols to balances
- `transactions`: Array of recent transactions
- `lastUpdated`: ISO timestamp of last update

### defiContext

Context for DeFi protocol data.

#### Schema

```typescript
z.object({
  protocol: z.string().describe('DeFi protocol name'),
  network: z.string().default('ethereum').describe('Blockchain network')
})
```

#### Key Function

Uses `${network}:${protocol}` as the key.

#### State Properties

- `protocol`: Protocol name
- `network`: Blockchain network
- `pools`: Array of liquidity pools
- `userPositions`: Array of user positions in the protocol
- `metrics`: Protocol metrics like TVL, volume, etc.
- `lastUpdated`: ISO timestamp of last update

### nftContext

Context for NFT collection data.

#### Schema

```typescript
z.object({
  collection: z.string().describe('NFT collection address or name'),
  network: z.string().default('ethereum').describe('Blockchain network')
})
```

#### Key Function

Uses `${network}:${collection}` as the key.

#### State Properties

- `collection`: Collection address or name
- `network`: Blockchain network
- `name`: Collection name
- `tokenCount`: Total number of tokens in the collection
- `floorPrice`: Current floor price
- `items`: Array of NFT items
- `ownedItems`: Array of owned NFT items
- `lastUpdated`: ISO timestamp of last update

### crossChainContext

Context for cross-chain analysis.

#### Schema

```typescript
z.object({
  id: z.string().default(() => uuidv4()).describe('Analysis ID'),
  chains: z.array(z.string()).min(1).describe('Chains to include in analysis')
})
```

#### Key Function

Uses the analysis ID as the key.

#### State Properties

- `id`: Analysis ID
- `chains`: Array of chains being analyzed
- `chainData`: Object mapping chain names to their data
- `opportunities`: Array of detected opportunities
- `analysis`: Analysis results
- `createdAt`: ISO timestamp of creation
- `updatedAt`: ISO timestamp of last update

## Actions

### connectBlockchainAction

Connect to a blockchain network.

#### Schema

```typescript
z.object({
  network: z.string().describe('The blockchain network to connect to')
})
```

#### Returns

- `success`: Boolean indicating success
- `network`: Network name
- `status`: Connection status
- `blockNumber`: Current block number
- `gasPrice`: Current gas price
- `message`: Status message

### getWalletBalanceAction

Get the balance of a wallet.

#### Schema

```typescript
z.object({
  address: z.string().describe('Wallet address'),
  network: z.string().default('ethereum').describe('Blockchain network'),
  includeTokens: z.boolean().default(true).describe('Whether to include token balances')
})
```

#### Returns

- `success`: Boolean indicating success
- `address`: Wallet address
- `network`: Network name
- `balance`: Object containing native and token balances
- `message`: Status message

### getDeFiProtocolDataAction

Get data for a DeFi protocol.

#### Schema

```typescript
z.object({
  protocol: z.string().describe('Protocol name or address'),
  network: z.string().default('ethereum').describe('Blockchain network')
})
```

#### Returns

- `success`: Boolean indicating success
- `protocol`: Protocol name
- `network`: Network name
- `metrics`: Protocol metrics
- `pools`: Array of liquidity pools
- `message`: Status message

### getNFTCollectionDataAction

Get data for an NFT collection.

#### Schema

```typescript
z.object({
  collection: z.string().describe('Collection address or name'),
  network: z.string().default('ethereum').describe('Blockchain network')
})
```

#### Returns

- `success`: Boolean indicating success
- `collection`: Collection address or name
- `network`: Network name
- `data`: Collection data
- `message`: Status message

### analyzeCrossChainOpportunitiesAction

Analyze opportunities across multiple blockchain networks.

#### Schema

```typescript
z.object({
  chains: z.array(z.string()).min(1).describe('Chains to analyze'),
  strategy: z.enum(['arbitrage', 'yield', 'bridge', 'all']).default('all').describe('Analysis strategy'),
  minProfitPercent: z.number().min(0).max(100).default(1).describe('Minimum profit percentage')
})
```

#### Returns

- `success`: Boolean indicating success
- `opportunities`: Array of detected opportunities
- `analysis`: Analysis summary and timestamp
- `message`: Status message

### executeCrossChainPlanAction

Execute a plan across multiple blockchains.

#### Schema

```typescript
z.object({
  opportunity: z.object({
    type: z.string(),
    chains: z.array(z.string()),
    description: z.string()
  }).describe('The opportunity to execute'),
  dryRun: z.boolean().default(true).describe('Whether to perform a dry run or actual execution')
})
```

#### Returns

- `success`: Boolean indicating success
- `steps`: Array of execution steps
- `dryRun`: Whether this was a dry run
- `message`: Status message

### monitorBlockchainAction

Monitor a blockchain for events.

#### Schema

```typescript
z.object({
  network: z.string().describe('Blockchain network to monitor'),
  eventTypes: z.array(z.enum(['block', 'transaction', 'contract'])).default(['block']).describe('Event types to monitor'),
  duration: z.number().min(1).max(60).default(10).describe('Duration to monitor in minutes')
})
```

#### Returns

- `success`: Boolean indicating success
- `monitorId`: Unique ID for this monitoring session
- `events`: Array of detected events
- `message`: Status message

## Configuration

### Environment Variables

The bridge can be configured using the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `GROQ_API_KEY` | API key for Groq | (required) |
| `ANTHROPIC_API_KEY` | API key for Anthropic | (optional) |
| `OPENAI_API_KEY` | API key for OpenAI | (optional) |
| `ETHEREUM_RPC_URL` | RPC URL for Ethereum | (required for Ethereum) |
| `ARBITRUM_RPC_URL` | RPC URL for Arbitrum | (required for Arbitrum) |
| `POLYGON_RPC_URL` | RPC URL for Polygon | (required for Polygon) |
| `OPTIMISM_RPC_URL` | RPC URL for Optimism | (required for Optimism) |
| `ANUS_AI_LOG_LEVEL` | Log level for ANUS AI | info |
| `DAYDREAMS_LOG_LEVEL` | Log level for Daydreams | info |
| `BRIDGE_LOG_LEVEL` | Log level for the bridge | info |
| `EVENT_BUS_LOG_LEVEL` | Log level for the event bus | info |
| `MEMORY_PERSISTENCE_PATH` | Path for memory persistence | ./data/memory |
| `DAYDREAMS_DEFAULT_MODEL` | Default model for Daydreams | groq-deepseek-r1-distill-llama-70b |
| `WEB_API_PORT` | Port for web API | 3000 |
| `CORS_ALLOWED_ORIGINS` | CORS allowed origins | http://localhost:3000 |
