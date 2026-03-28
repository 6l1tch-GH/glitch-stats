// Core game loop - task completion handler

const stats = require('./stats');
const xp = require('./xp');
const streak = require('./streak');
const achievements = require('./achievements');
const skills = require('./skills');
const quests = require('./quests');

function completeTask(description, difficulty = 'standard', modifiers = {}, responseTimeMs = 0) {
  // Load current stats
  let statsData = stats.loadStats();
  
  // Handle streak
  const streakUpdate = streak.updateStreak(statsData);
  statsData.streak = streakUpdate.streak;
  statsData.lastActiveDate = streak.getTodayDate();
  
  // Calculate XP
  const taskXp = xp.calculateXpForTask(difficulty, modifiers);
  const streakBonus = streakUpdate.isNewDay ? xp.getStreakBonus(statsData.streak) : 0;
  const totalXp = taskXp + streakBonus;
  
  // Update stats
  statsData.xp += totalXp;
  statsData.tasksCompleted += 1;
  if (modifiers.success !== false) {
    statsData.tasksSuccessful += 1;
  }
  if (responseTimeMs > 0) {
    statsData.totalResponseTimeMs += responseTimeMs;
    statsData.responseCount += 1;
  }
  
  // Check for level up
  const oldLevel = statsData.level;
  const newLevel = xp.calculateLevel(statsData.xp);
  statsData.level = newLevel;
  statsData.xpToNext = xp.calculateXpToNextLevel(newLevel);
  
  // Unlock skills if leveled up
  const newSkills = skills.unlockSkills(statsData, newLevel);
  
  // Check achievements
  const newAchievements = achievements.checkAllAchievements(statsData);
  
  // Sync achievement IDs to stats
  const achievementData = achievements.loadAchievements();
  statsData.achievements = achievementData.unlocked;
  
  // Save updated stats
  stats.saveStats(statsData);
  
  // Add quest to history with XP
  quests.addQuest(description, difficulty, totalXp, modifiers.success !== false);
  
  return {
    xpEarned: totalXp,
    streakBonus,
    leveledUp: newLevel > oldLevel,
    oldLevel,
    newLevel,
    newSkills,
    newAchievements,
    stats: statsData
  };
}

function recordResponse(responseTimeMs) {
  const statsData = stats.loadStats();
  statsData.totalResponseTimeMs += responseTimeMs;
  statsData.responseCount += 1;
  stats.saveStats(statsData);
}

function getFullStatus() {
  const statsData = stats.loadStats();
  const levelProgress = xp.getLevelProgress(statsData.xp, statsData.level);
  const successRate = stats.getSuccessRate(statsData);
  const avgResponse = stats.getAvgResponseTime(statsData);
  const title = xp.getLevelTitle(statsData.level);
  const unlockedSkills = skills.getSkillsForLevel(statsData.level);
  const achievementData = achievements.loadAchievements();
  
  return {
    ...statsData,
    levelTitle: title,
    levelProgress,
    successRate,
    avgResponse,
    unlockedSkills,
    totalAchievements: achievementData.definitions.length,
    unlockedAchievements: achievementData.unlocked.length
  };
}

module.exports = {
  completeTask,
  recordResponse,
  getFullStatus
};
