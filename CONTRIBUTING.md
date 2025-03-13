# Contributing to ANUS-DREAMS Bridge

Thank you for your interest in contributing to the ANUS-DREAMS Bridge! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue tracker as you might find that the issue has already been reported. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue
- **Describe the exact steps to reproduce the issue**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** after following the steps
- **Explain the behavior you expected to see**
- **Include screenshots or screen recordings** if possible
- **Include your environment information** (OS, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue
- **Provide a step-by-step description** of the suggested enhancement
- **Provide examples** of how this enhancement would help
- **Describe the current behavior** and **explain the behavior you'd like to see**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Follow the coding guidelines
- Include adequate tests for your changes
- Update documentation for your changes
- Link any relevant issues in the PR description
- Ensure all status checks are passing

## Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create a `.env` file from the template: `cp .env.template .env`
5. Fill in your API keys in the `.env` file
6. Build the project: `npm run build`
7. Run tests: `npm test`

## Coding Guidelines

- Follow the existing code style
- Use TypeScript's type system effectively
- Write descriptive variable and function names
- Document your code with JSDoc comments
- Follow the principles of clean code:
  - Single responsibility
  - Don't repeat yourself (DRY)
  - Write testable code
  - Keep functions small and focused

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Types include:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

## Testing Guidelines

- Write tests for all new features and bug fixes
- Aim for high test coverage
- Use descriptive test names that explain what is being tested
- Follow the AAA pattern (Arrange, Act, Assert)
- Test both success and failure cases
- Use mocks and stubs appropriately

## Documentation Guidelines

- Update documentation for all public APIs
- Use JSDoc comments for TypeScript code
- Keep the README up to date
- Document examples for complex functionality
- Use markdown for documentation files
- Include code examples where appropriate

Thank you for contributing to the ANUS-DREAMS Bridge!
