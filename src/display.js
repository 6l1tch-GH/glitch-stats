// Terminal dashboard display

const xp = require('./xp');
const stats = require('./stats');

function createProgressBar(current, max, width = 20) {
  const progress = max > 0 ? current / max : 0;
  const filled = Math.round(progress * width);
  const empty = width - filled;
  
  return '█'.repeat(filled) + '░'.repeat(empty);
}

function formatTime(ms) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function getLevelEmoji(level) {
  const emojis = {
    1: '🌱',
    2: '🌿',
    3: '🪴',
    4: '🌳',
    5: '🏆',
    6: '⚔️',
    7: '🛡️',
    8: '👑',
    9: '⭐',
    10: '🌟'
  };
  return emojis[level] || emojis[1];
}

function generateDashboard(statsData) {
  const levelProgress = xp.getLevelProgress(statsData.xp, statsData.level);
  const successRate = stats.getSuccessRate(statsData);
  const avgResponse = stats.getAvgResponseTime(statsData);
  const title = xp.getLevelTitle(statsData.level);
  const emoji = getLevelEmoji(statsData.level);
  
  const bar = createProgressBar(levelProgress.current, levelProgress.needed);
  
  const lines = [
    '╔═══════════════════════════════════════════╗',
    `║  ${emoji} GLITCH — ${title.padEnd(20)}║`,
    '╠═══════════════════════════════════════════╣',
    `║  Level: ${statsData.level} ${bar}  `,
    `║  XP: ${statsData.xp} / ${levelProgress.needed} (${levelProgress.remaining} to next)`.padEnd(43) + '║',
    '║                                           ║',
    `║  📋 Tasks: ${statsData.tasksCompleted} completed | ${successRate}% success`.padEnd(43) + '║',
    `║  ⚡ Avg Response: ${formatTime(avgResponse)}`.padEnd(43) + '║',
    `║  🔥 Streak: ${statsData.streak} day${statsData.streak !== 1 ? 's' : ''}                      ║`,
    `║  🎯 Skills: ${statsData.skillsUnlocked.length} unlocked                      ║`,
    `║  🏅 Achievements: ${statsData.achievements.length}                    ║`,
    '║                                           ║',
    '╚═══════════════════════════════════════════╝'
  ];
  
  return lines.join('\n');
}

function generateSessionSummary(sessionStats) {
  const lines = [
    '',
    '┌─────────────────────────────────────────┐',
    '│  📊 Session Summary                     │',
    '├─────────────────────────────────────────┤',
    `│  ✨ XP Earned: ${sessionStats.xpEarned || 0}`.padEnd(42) + '│',
    `│  📋 Tasks: ${sessionStats.tasksCompleted || 0}`.padEnd(42) + '│',
    `│  🎯 Level: ${sessionStats.level || 1}`.padEnd(42) + '│',
    '└─────────────────────────────────────────┘',
    ''
  ];
  
  return lines.join('\n');
}

function generateLevelUpNotification(oldLevel, newLevel, newSkills, newAchievements) {
  const lines = [
    '',
    '╔═══════════════════════════════════════════╗',
    '║         🎉 LEVEL UP! 🎉                   ║',
    `║  ${oldLevel} → ${newLevel}`.padEnd(43) + '║',
    '╚═══════════════════════════════════════════╝'
  ];
  
  if (newSkills && newSkills.length > 0) {
    lines.push('');
    lines.push('New Skills Unlocked:');
    newSkills.forEach(skill => {
      lines.push(`  🎯 ${skill.name}: ${skill.description}`);
    });
  }
  
  if (newAchievements && newAchievements.length > 0) {
    lines.push('');
    lines.push('Achievements Unlocked:');
    newAchievements.forEach(ach => {
      lines.push(`  🏆 ${ach.name}`);
    });
  }
  
  lines.push('');
  return lines.join('\n');
}

module.exports = {
  generateDashboard,
  generateSessionSummary,
  generateLevelUpNotification,
  createProgressBar,
  getLevelEmoji
};
