#!/usr/bin/env node

// Simple stats command wrapper for OpenClaw
// Can be called directly or via alias

const path = require('path');
const { execSync } = require('child_process');

const STATS_CMD = path.join(__dirname, '..', 'commands', 'stats.js');

try {
  const output = execSync(`node "${STATS_CMD}"`, { encoding: 'utf8' });
  console.log(output);
} catch (err) {
  console.error('Error running stats:', err.message);
  process.exit(1);
}
