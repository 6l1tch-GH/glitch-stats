const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const STATS_FILE = path.join(DATA_DIR, 'stats.json');

function loadStats() {
  try {
    const data = fs.readFileSync(STATS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading stats:', err.message);
    return getInitialStats();
  }
}

function saveStats(stats) {
  stats.updatedAt = new Date().toISOString();
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2) + '\n');
}

function getInitialStats() {
  return {
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
    lastActiveDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function getSuccessRate(stats) {
  if (stats.tasksCompleted === 0) return 0;
  return Math.round((stats.tasksSuccessful / stats.tasksCompleted) * 100);
}

function getAvgResponseTime(stats) {
  if (stats.responseCount === 0) return 0;
  return Math.round(stats.totalResponseTimeMs / stats.responseCount);
}

module.exports = {
  loadStats,
  saveStats,
  getInitialStats,
  getSuccessRate,
  getAvgResponseTime,
  STATS_FILE
};
