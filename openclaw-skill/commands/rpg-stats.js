#!/usr/bin/env node

// OpenClaw skill command: /rpg-stats
// Displays agent gamification dashboard

const { execSync } = require('child_process');
const path = require('path');

const STATS_CMD = path.join(process.env.HOME, 'glitch-stats', 'commands', 'stats.js');

try {
  const output = execSync(`node "${STATS_CMD}"`, { encoding: 'utf8' });
  console.log(output);
} catch (err) {
  console.error('Error: Could not run glitch-stats');
  console.error('Make sure the repo is cloned: ~/glitch-stats');
  process.exit(1);
}
