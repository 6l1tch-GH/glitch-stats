// XP and Level System

const LEVEL_CAP = 10;
const BASE_XP = 100;

// XP rewards by task difficulty
const XP_REWARDS = {
  simple: 10,
  standard: 25,
  complex: 50,
  epic: 100
};

// Modifiers
const MODIFIERS = {
  complexTask: 10,
  novelTask: 25,
  positiveFeedback: 15,
  dailyBonus: 5
};

// Streak bonuses
const STREAK_BONUSES = [
  { days: 3, xp: 5 },
  { days: 7, xp: 10 },
  { days: 14, xp: 15 },
  { days: 30, xp: 25 }
];

function calculateXpToNextLevel(level) {
  if (level >= LEVEL_CAP) return Infinity;
  return BASE_XP * Math.pow(2, level - 1);
}

function calculateLevel(totalXp) {
  let level = 1;
  let cumulativeXp = 0;
  
  for (let i = 1; i < LEVEL_CAP; i++) {
    const xpNeeded = calculateXpToNextLevel(i);
    if (totalXp < cumulativeXp + xpNeeded) {
      return level;
    }
    cumulativeXp += xpNeeded;
    level++;
  }
  
  return LEVEL_CAP;
}

function getLevelProgress(xp, level) {
  if (level >= LEVEL_CAP) {
    return { current: xp, needed: 0, remaining: 0, isMax: true };
  }
  
  // Calculate XP at start of current level
  let xpAtLevelStart = 0;
  for (let i = 1; i < level; i++) {
    xpAtLevelStart += calculateXpToNextLevel(i);
  }
  
  const xpInCurrentLevel = xp - xpAtLevelStart;
  const xpNeededForNext = calculateXpToNextLevel(level);
  const xpRemaining = xpNeededForNext - xpInCurrentLevel;
  
  return {
    current: xpInCurrentLevel,
    needed: xpNeededForNext,
    remaining: Math.max(0, xpRemaining),
    isMax: false
  };
}

function calculateXpForTask(difficulty, modifiers = {}) {
  let xp = XP_REWARDS[difficulty] || XP_REWARDS.standard;
  
  if (modifiers.isComplex) xp += MODIFIERS.complexTask;
  if (modifiers.isNovel) xp += MODIFIERS.novelTask;
  if (modifiers.hasFeedback) xp += MODIFIERS.positiveFeedback;
  
  return xp;
}

function getStreakBonus(streak) {
  let bonus = 0;
  for (const tier of STREAK_BONUSES) {
    if (streak >= tier.days) {
      bonus = tier.xp;
    }
  }
  return bonus;
}

function getLevelTitle(level) {
  const titles = {
    1: 'New Agent',
    2: 'Apprentice',
    3: 'Journeyman',
    4: 'Adept',
    5: 'Specialist',
    6: 'Expert',
    7: 'Master',
    8: 'Grand Master',
    9: 'Legend',
    10: 'Legendary Operator'
  };
  return titles[level] || titles[1];
}

module.exports = {
  calculateXpToNextLevel,
  calculateLevel,
  getLevelProgress,
  calculateXpForTask,
  getStreakBonus,
  getLevelTitle,
  LEVEL_CAP,
  XP_REWARDS,
  MODIFIERS
};
