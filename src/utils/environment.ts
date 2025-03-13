/**
 * Environment configuration utilities for the ANUS-DREAMS Bridge
 */

import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Get an environment variable with type checking
 * 
 * @param key The environment variable key
 * @param defaultValue Default value if the environment variable is not set
 * @returns The environment variable value or the default value
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

/**
 * Get an environment variable as a number
 * 
 * @param key The environment variable key
 * @param defaultValue Default value if the environment variable is not set or invalid
 * @returns The environment variable value as a number or the default value
 */
export function getEnvAsInt(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    return defaultValue;
  }
  
  return parsed;
}

/**
 * Get an environment variable as a boolean
 * 
 * @param key The environment variable key
 * @param defaultValue Default value if the environment variable is not set
 * @returns The environment variable value as a boolean or the default value
 */
export function getEnvAsBoolean(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  
  return value.toLowerCase() === 'true' || value === '1';
}

/**
 * Get an RPC URL for a specific blockchain network
 * 
 * @param network The blockchain network name
 * @returns The RPC URL for the specified network
 */
export function getRpcUrl(network: string): string {
  const networkUpper = network.toUpperCase();
  const key = `${networkUpper}_RPC_URL`;
  
  try {
    return getEnv(key);
  } catch (error) {
    throw new Error(`No RPC URL configured for network ${network}`);
  }
}

/**
 * Environment configuration for the bridge
 */
export const BridgeConfig = {
  // API Keys
  groqApiKey: getEnv('GROQ_API_KEY', ''),
  anthropicApiKey: getEnv('ANTHROPIC_API_KEY', ''),
  openaiApiKey: getEnv('OPENAI_API_KEY', ''),
  
  // Log levels
  anusLogLevel: getEnv('ANUS_AI_LOG_LEVEL', 'info'),
  daydreamsLogLevel: getEnv('DAYDREAMS_LOG_LEVEL', 'info'),
  bridgeLogLevel: getEnv('BRIDGE_LOG_LEVEL', 'info'),
  eventBusLogLevel: getEnv('EVENT_BUS_LOG_LEVEL', 'info'),
  
  // Memory persistence
  memoryPath: getEnv('MEMORY_PERSISTENCE_PATH', './data/memory'),
  
  // Daydreams configuration
  defaultModel: getEnv('DAYDREAMS_DEFAULT_MODEL', 'groq-deepseek-r1-distill-llama-70b'),
  
  // Web API configuration
  webApiPort: getEnvAsInt('WEB_API_PORT', 3000),
  corsAllowedOrigins: getEnv('CORS_ALLOWED_ORIGINS', 'http://localhost:3000'),
  
  // RPC URLs getter
  getRpcUrl
};

export default BridgeConfig;
