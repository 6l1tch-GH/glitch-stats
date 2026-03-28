#!/usr/bin/env node

// Test script to simulate task completion

const game = require('../src/game');
const display = require('../src/display');

console.log('Simulating task completion...\n');

// Simulate a standard task
const result = game.completeTask(
  'Research gamification patterns',
  'standard',
  { success: true },
  1500 // 1.5s response time
);

console.log('Task Result:');
console.log(`  XP Earned: ${result.xpEarned}`);
if (result.streakBonus > 0) {
  console.log(`  Streak Bonus: ${result.streakBonus}`);
}
if (result.leveledUp) {
  console.log(`  🎉 LEVEL UP! ${result.oldLevel} → ${result.newLevel}`);
}
if (result.newSkills.length > 0) {
  console.log('  New Skills Unlocked:');
  result.newSkills.forEach(skill => {
    console.log(`    - ${skill.name}: ${skill.description}`);
  });
}
if (result.newAchievements.length > 0) {
  console.log('  Achievements Unlocked:');
  result.newAchievements.forEach(ach => {
    console.log(`    🏆 ${ach.name}`);
  });
}

console.log('\n' + '='.repeat(50) + '\n');

// Show updated dashboard
const status = game.getFullStatus();
console.log(display.generateDashboard(status));
