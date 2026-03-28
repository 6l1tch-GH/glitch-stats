#!/usr/bin/env node

// OpenClaw skill command: /rpg-achievements
// Displays achievements

const { execSync } = require('child_process');
const path = require('path');

const ACHIEVEMENTS_CMD = path.join(process.env.HOME, 'glitch-stats', 'commands', 'achievements.js');

try {
  const output = execSync(`node "${ACHIEVEMENTS_CMD}"`, { encoding: 'utf8' });
  console.log(output);
} catch (err) {
  console.error('Error: Could not run glitch-stats achievements');
  process.exit(1);
}
