#!/usr/bin/env node

// OpenClaw skill command: /rpg-quests
// Displays quest history

const { execSync } = require('child_process');
const path = require('path');

const QUESTS_CMD = path.join(process.env.HOME, 'glitch-stats', 'commands', 'quests.js');

try {
  const output = execSync(`node "${QUESTS_CMD}"`, { encoding: 'utf8' });
  console.log(output);
} catch (err) {
  console.error('Error: Could not run glitch-stats quests');
  process.exit(1);
}
