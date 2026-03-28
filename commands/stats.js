#!/usr/bin/env node

const stats = require('../src/stats');
const display = require('../src/display');

// Load current stats
const statsData = stats.loadStats();

// Generate and display dashboard
const dashboard = display.generateDashboard(statsData);
console.log(dashboard);

// Show recent quests (last 5)
const fs = require('fs');
const path = require('path');
const questsFile = path.join(__dirname, '..', 'data', 'quests.json');

try {
  const questsData = JSON.parse(fs.readFileSync(questsFile, 'utf8'));
  const recentQuests = questsData.quests.slice(-5).reverse();
  
  if (recentQuests.length > 0) {
    console.log('\nRecent Quests:');
    recentQuests.forEach(quest => {
      const icon = quest.success ? '✓' : '✗';
      console.log(`  ${icon} ${quest.description} (+${quest.xpEarned} XP)`);
    });
  }
} catch (err) {
  // No quests yet
}
