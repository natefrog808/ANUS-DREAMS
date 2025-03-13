/**
 * ANUS-DREAMS Bridge Tests
 * 
 * Basic tests for the bridge functionality.
 * These are simple tests to verify that the bridge works as expected.
 * In a real implementation, you would have more comprehensive tests.
 */

import { createAnusDreamsAgent } from '../src/index';

// Mock the Daydreams modules since they're not actually installed during tests
jest.mock('@daydreamsai/core', () => ({
  createDreams: jest.fn(() => ({
    start: jest.fn(),
    contexts: [{ type: 'test-context' }],
    actions: [{ name: 'test-action' }]
  })),
  context: jest.fn((config) => config),
  action: jest.fn((config) => config)
}));

jest.mock('@daydreamsai/core/models', () => ({
  groq: jest.fn((model) => ({ name: model }))
}));

jest.mock('@daydreamsai/core/extensions', () => ({
  cli: { type: 'cli-extension' }
}));

describe('ANUS-DREAMS Bridge', () => {
  
  test('createAnusDreamsAgent should return an agent', () => {
    // Act
    const agent = createAnusDreamsAgent();
    
    // Assert
    expect(agent).toBeDefined();
    expect(agent.start).toBeDefined();
    expect(agent.contexts).toBeDefined();
    expect(agent.actions).toBeDefined();
  });
  
  test('createAnusDreamsAgent should accept custom configuration', () => {
    // Arrange
    const customConfig = {
      model: { custom: 'model' },
      extensions: [{ custom: 'extension' }],
      systemMessage: 'Custom system message'
    };
    
    // Act
    const agent = createAnusDreamsAgent(customConfig);
    
    // Assert
    expect(agent).toBeDefined();
    expect(agent.start).toBeDefined();
  });
  
  test('Agent should have blockchain contexts', () => {
    // Act
    const agent = createAnusDreamsAgent();
    
    // In real test, you would check for specific contexts
    // For now, we just check if contexts exist
    expect(agent.contexts).toBeDefined();
    expect(Array.isArray(agent.contexts)).toBe(true);
  });
  
  test('Agent should have blockchain actions', () => {
    // Act
    const agent = createAnusDreamsAgent();
    
    // In real test, you would check for specific actions
    // For now, we just check if actions exist
    expect(agent.actions).toBeDefined();
    expect(Array.isArray(agent.actions)).toBe(true);
  });
});

// Note: In a real implementation, you would have more comprehensive tests
// including testing individual contexts and actions
