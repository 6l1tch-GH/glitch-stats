// Streak tracking system

function getTodayDate() {
  // Use Asia/Dubai timezone (UTC+4)
  const now = new Date();
  const dubaiTime = new Date(now.getTime() + (4 * 60 * 60 * 1000));
  return dubaiTime.toISOString().split('T')[0];
}

function isNewDay(lastActiveDate) {
  const today = getTodayDate();
  return lastActiveDate !== today;
}

function isConsecutiveDay(lastActiveDate) {
  const today = getTodayDate();
  const last = new Date(lastActiveDate + 'T00:00:00');
  const now = new Date(today + 'T00:00:00');
  const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
  
  // Consecutive if 1 day apart (yesterday) or 0 (same day)
  return diffDays <= 1;
}

function updateStreak(stats) {
  const today = getTodayDate();
  
  if (stats.lastActiveDate === today) {
    // Already active today, no change
    return { streak: stats.streak, isNewDay: false };
  }
  
  if (isConsecutiveDay(stats.lastActiveDate)) {
    // Consecutive day - increment streak
    return { streak: stats.streak + 1, isNewDay: true };
  } else {
    // Streak broken - reset to 1
    return { streak: 1, isNewDay: true };
  }
}

module.exports = {
  getTodayDate,
  isNewDay,
  isConsecutiveDay,
  updateStreak
};
