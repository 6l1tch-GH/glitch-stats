#!/usr/bin/env node

// OpenClaw integration hook
// Call this to record task completion

const game = require('../src/game');
const display = require('../src/display');

const [,, action, ...args] = process.argv;

function parseArgs(args) {
  const params = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const value = args[i + 1];
      if (value && !value.startsWith('--')) {
        params[key] = value;
        i++;
      } else {
        params[key] = true;
      }
    }
  }
  return params;
}

switch (action) {
  case 'complete': {
    const params = parseArgs(args);
    const description = params.desc || params.description || 'Unnamed task';
    const difficulty = params.difficulty || params.diff || 'standard';
    const responseTime = parseInt(params.time || params.responseTime || '0', 10);
    const success = params.success !== 'false';
    
    const result = game.completeTask(description, difficulty, { success }, responseTime);
    
    // Output JSON for parsing
    console.log(JSON.stringify({
      action: 'task_complete',
      xpEarned: result.xpEarned,
      streakBonus: result.streakBonus,
      leveledUp: result.leveledUp,
      oldLevel: result.oldLevel,
      newLevel: result.newLevel,
      newSkills: result.newSkills.map(s => s.name),
      newAchievements: result.newAchievements.map(a => a.name)
    }));
    break;
  }
  
  case 'status': {
    const status = game.getFullStatus();
    console.log(display.generateDashboard(status));
    break;
  }
  
  case 'summary': {
    const status = game.getFullStatus();
    console.log(display.generateSessionSummary({
      xpEarned: status.xp,
      tasksCompleted: status.tasksCompleted,
      level: status.level
    }));
    break;
  }
  
  default:
    console.log('Usage: openclaw-hook.js <action> [options]');
    console.log('Actions: complete, status, summary');
    console.log('');
    console.log('Examples:');
    console.log('  complete --desc "Research topic" --difficulty standard --time 1500');
    console.log('  status');
    console.log('  summary');
    process.exit(1);
}
