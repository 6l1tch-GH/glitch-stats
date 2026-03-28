#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const questsFile = path.join(__dirname, '..', 'data', 'quests.json');

try {
  const data = JSON.parse(fs.readFileSync(questsFile, 'utf8'));
  const quests = data.quests.reverse();
  
  if (quests.length === 0) {
    console.log('No quests completed yet. Start working!');
    process.exit(0);
  }
  
  console.log('Quest Log\n');
  console.log('ID | Description | Difficulty | XP | Status');
  console.log('─'.repeat(60));
  
  quests.forEach((quest, idx) => {
    const status = quest.success ? '✓' : '✗';
    const num = (quests.length - idx).toString().padStart(2);
    const desc = quest.description.substring(0, 30).padEnd(30);
    const diff = quest.difficulty.padEnd(8);
    const xp = quest.xpEarned.toString().padStart(3);
    console.log(`${num} | ${desc} | ${diff} | ${xp} | ${status}`);
  });
  
  console.log(`\nTotal: ${quests.length} quests`);
} catch (err) {
  console.error('Error loading quests:', err.message);
}
