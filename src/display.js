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

function generateDashboard(statsData) {
  const levelProgress = xp.getLevelProgress(statsData.xp, statsData.level);
  const successRate = stats.getSuccessRate(statsData);
  const avgResponse = stats.getAvgResponseTime(statsData);
  const title = xp.getLevelTitle(statsData.level);
  
  const bar = createProgressBar(levelProgress.current, levelProgress.needed);
  
  const lines = [
    '╔═══════════════════════════════════════════╗',
    `║  GLITCH — ${title.padEnd(23)}║`,
    '╠═══════════════════════════════════════════╣',
    `║  Level: ${statsData.level} ${bar}  `,
    `║  XP: ${statsData.xp} / ${levelProgress.needed} (${levelProgress.remaining} to next)`.padEnd(43) + '║',
    '║                                           ║',
    `║  Tasks: ${statsData.tasksCompleted} completed | ${successRate}% success`.padEnd(43) + '║',
    `║  Avg Response: ${formatTime(avgResponse)}`.padEnd(43) + '║',
    `║  Streak: ${statsData.streak} day${statsData.streak !== 1 ? 's' : ''} 🔥`.padEnd(43) + '║',
    `║  Skills: ${statsData.skillsUnlocked.length} unlocked`.padEnd(43) + '║',
    `║  Achievements: ${statsData.achievements.length}`.padEnd(43) + '║',
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
    `│  XP Earned: ${sessionStats.xpEarned || 0}`.padEnd(42) + '│',
    `│  Tasks: ${sessionStats.tasksCompleted || 0}`.padEnd(42) + '│',
    `│  Level: ${sessionStats.level || 1}`.padEnd(42) + '│',
    '└─────────────────────────────────────────┘',
    ''
  ];
  
  return lines.join('\n');
}

module.exports = {
  generateDashboard,
  generateSessionSummary,
  createProgressBar
};
