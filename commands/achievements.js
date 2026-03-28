#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const achievementsFile = path.join(__dirname, '..', 'data', 'achievements.json');

try {
  const data = JSON.parse(fs.readFileSync(achievementsFile, 'utf8'));
  
  console.log('Achievements\n');
  
  console.log('🏆 Unlocked:');
  if (data.unlocked.length === 0) {
    console.log('  (none yet)');
  } else {
    const unlockedDefs = data.definitions.filter(d => data.unlocked.includes(d.id));
    unlockedDefs.forEach(ach => {
      console.log(`  ✓ ${ach.name} — ${ach.description}`);
    });
  }
  
  console.log('\n📌 Available:');
  const lockedDefs = data.definitions.filter(d => !data.unlocked.includes(d.id));
  lockedDefs.forEach(ach => {
    console.log(`  ⦿ ${ach.name} — ${ach.description}`);
  });
  
  console.log(`\nTotal: ${data.unlocked.length}/${data.definitions.length} unlocked`);
} catch (err) {
  console.error('Error loading achievements:', err.message);
}
