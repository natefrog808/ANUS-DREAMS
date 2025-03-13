To use this project:

Create the directory structure:

Copymkdir -p anus-dreams-bridge/src/examples anus-dreams-bridge/tests

Save all the files in their respective locations:

Main implementation in src/index.ts
Examples in src/examples/
Configuration files in the root directory
Test file in tests/


Install dependencies:

Copycd anus-dreams-bridge
npm install

Build the project:

Copynpm run build

Run an example agent:

Copynpm run agent:crosschain
This setup allows for a clean development workflow where you can start with a single-file implementation and gradually refactor into a more modular structure as the project grows. The example agents demonstrate real-world use cases to help users understand how to leverage the bridge.
