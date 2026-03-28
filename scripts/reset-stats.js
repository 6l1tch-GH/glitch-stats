#!/usr/bin/env node

// Reset all stats (use with caution)

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

function resetStats() {
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString();
  
  // Reset stats.json
  const stats = {
    level: 1,
    xp: 0,
    xpToNext: 100,
    tasksCompleted: 0,
    tasksSuccessful: 0,
    totalResponseTimeMs: 0,
    responseCount: 0,
    skillsUnlocked: [],
    achievements: [],
    streak: 0,
    lastActiveDate: today,
    createdAt: now,
    updatedAt: now
  };
  
  fs.writeFileSync(
    path.join(DATA_DIR, 'stats.json'),
    JSON.stringify(stats, null, 2) + '\n'
  );
  
  // Reset achievements (keep definitions, clear unlocked)
  const achievementsPath = path.join(DATA_DIR, 'achievements.json');
  const achievements = JSON.parse(fs.readFileSync(achievementsPath, 'utf8'));
  achievements.unlocked = [];
  fs.writeFileSync(achievementsPath, JSON.stringify(achievements, null, 2) + '\n');
  
  // Clear quests
  fs.writeFileSync(
    path.join(DATA_DIR, 'quests.json'),
    JSON.stringify({ quests: [] }, null, 2) + '\n'
  );
  
  console.log('✅ Stats reset complete');
  console.log('   - Level reset to 1');
  console.log('   - XP reset to 0');
  console.log('   - Achievements cleared');
  console.log('   - Quest history cleared');
  console.log('   - Streak reset');
}

// Confirm before resetting
if (process.argv.includes('--force') || process.argv.includes('-f')) {
  resetStats();
} else {
  console.log('⚠️  This will permanently delete all stats, achievements, and quest history.');
  console.log('');
  console.log('Run with --force or -f to confirm:');
  console.log('  node scripts/reset-stats.js --force');
  process.exit(0);
}
