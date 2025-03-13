/**
 * Script to set up npm scripts with improved documentation and options
 */

const { concurrent, series, rimraf } = require('nps-utils');

module.exports = {
  scripts: {
    default: {
      description: 'Build the project',
      script: 'nps build'
    },
    
    // Build scripts
    build: {
      description: 'Build the project',
      default: series.nps('build.clean', 'build.tsc'),
      clean: {
        description: 'Clean the build directory',
        script: rimraf('dist')
      },
      tsc: {
        description: 'Compile TypeScript sources',
        script: 'tsc'
      },
      watch: {
        description: 'Watch for changes and rebuild',
        script: 'tsc --watch'
      }
    },
    
    // Test scripts
    test: {
      description: 'Run tests',
      default: 'jest',
      watch: {
        description: 'Run tests in watch mode',
        script: 'jest --watch'
      },
      coverage: {
        description: 'Run tests with coverage',
        script: 'jest --coverage'
      }
    },
    
    // Lint scripts
    lint: {
      description: 'Lint sources',
      default: 'eslint src/**/*.ts',
      fix: {
        description: 'Lint and fix sources',
        script: 'eslint src/**/*.ts --fix'
      }
    },
    
    // Documentation scripts
    docs: {
      description: 'Generate documentation',
      default: 'typedoc',
      serve: {
        description: 'Generate and serve documentation',
        script: series.nps('docs', 'docs.serve.only'),
        only: {
          description: 'Serve documentation without regenerating',
          script: 'npx serve docs'
        }
      }
    },
    
    // Example agent scripts
    agent: {
      description: 'Run example agents',
      default: 'ts-node src/examples/index.ts',
      crosschain: {
        description: 'Run the cross-chain analyst agent',
        script: 'ts-node src/examples/crosschain-analyst.ts'
      },
      defi: {
        description: 'Run the DeFi portfolio manager agent',
        script: 'ts-node src/examples/defi-manager.ts'
      },
      nft: {
        description: 'Run the NFT collection analyzer agent',
        script: 'ts-node src/examples/nft-analyzer.ts'
      }
    },
    
    // Development scripts
    dev: {
      description: 'Run development environment',
      default: concurrent.nps('build.watch', 'test.watch'),
      
      setup: {
        description: 'Set up development environment',
        script: series('npm install', 'mkdir -p data/memory', 'cp .env.template .env')
      }
    },
    
    // Utility scripts
    format: {
      description: 'Format code with Prettier',
      script: 'prettier --write "src/**/*.ts"'
    },
    
    validate: {
      description: 'Validate the project',
      script: concurrent.nps('lint', 'test')
    },
    
    prepare: {
      description: 'Prepare for publishing',
      script: series.nps('validate', 'build')
    }
  }
};
