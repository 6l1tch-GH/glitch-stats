// Quest (task) management

const fs = require('fs');
const path = require('path');

const QUESTS_FILE = path.join(__dirname, '..', 'data', 'quests.json');

function loadQuests() {
  try {
    const data = fs.readFileSync(QUESTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading quests:', err.message);
    return { quests: [] };
  }
}

function saveQuests(data) {
  fs.writeFileSync(QUESTS_FILE, JSON.stringify(data, null, 2) + '\n');
}

function createQuest(description, difficulty = 'standard') {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    description,
    difficulty,
    xpEarned: 0,
    completedAt: null,
    success: false,
    createdAt: new Date().toISOString()
  };
}

function completeQuest(questId, success = true, xpEarned = 0) {
  const data = loadQuests();
  const quest = data.quests.find(q => q.id === questId);
  
  if (!quest) {
    console.error(`Quest ${questId} not found`);
    return null;
  }
  
  quest.completedAt = new Date().toISOString();
  quest.success = success;
  quest.xpEarned = xpEarned;
  
  saveQuests(data);
  return quest;
}

function addQuest(description, difficulty = 'standard', xpEarned = 0, success = true) {
  const data = loadQuests();
  const quest = createQuest(description, difficulty);
  quest.xpEarned = xpEarned;
  quest.success = success;
  quest.completedAt = new Date().toISOString();
  data.quests.push(quest);
  saveQuests(data);
  return quest;
}

function getRecentQuests(limit = 5) {
  const data = loadQuests();
  return data.quests.slice(-limit).reverse();
}

module.exports = {
  loadQuests,
  saveQuests,
  createQuest,
  completeQuest,
  addQuest,
  getRecentQuests,
  QUESTS_FILE
};
