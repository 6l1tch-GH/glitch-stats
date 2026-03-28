// Achievement system

const fs = require('fs');
const path = require('path');
const stats = require('./stats');

const ACHIEVEMENTS_FILE = path.join(__dirname, '..', 'data', 'achievements.json');

function loadAchievements() {
  try {
    const data = fs.readFileSync(ACHIEVEMENTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading achievements:', err.message);
    return { definitions: [], unlocked: [] };
  }
}

function saveAchievements(data) {
  fs.writeFileSync(ACHIEVEMENTS_FILE, JSON.stringify(data, null, 2) + '\n');
}

function checkAchievement(definition, statsData) {
  const criteria = definition.criteria;
  
  // Check each criterion
  for (const [key, value] of Object.entries(criteria)) {
    if (key === 'successRate') {
      const actualRate = stats.getSuccessRate(statsData);
      if (actualRate < value) return false;
    } else if (key === 'avgResponseTimeMs') {
      const actualTime = stats.getAvgResponseTime(statsData);
      if (actualTime > value) return false;
    } else if (statsData[key] === undefined) {
      return false;
    } else if (statsData[key] < value) {
      return false;
    }
  }
  
  return true;
}

function checkAllAchievements(statsData) {
  const data = loadAchievements();
  const newlyUnlocked = [];
  
  for (const def of data.definitions) {
    // Skip if already unlocked
    if (data.unlocked.includes(def.id)) continue;
    
    // Check if criteria met
    if (checkAchievement(def, statsData)) {
      data.unlocked.push(def.id);
      newlyUnlocked.push(def);
    }
  }
  
  // Save if any new achievements
  if (newlyUnlocked.length > 0) {
    saveAchievements(data);
  }
  
  return newlyUnlocked;
}

function getAchievementById(id) {
  const data = loadAchievements();
  return data.definitions.find(d => d.id === id);
}

module.exports = {
  loadAchievements,
  saveAchievements,
  checkAchievement,
  checkAllAchievements,
  getAchievementById,
  ACHIEVEMENTS_FILE
};
