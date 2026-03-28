// Skill tree system

const SKILL_TREE = [
  {
    level: 2,
    id: 'advanced_search',
    name: 'Advanced Search',
    description: 'Multi-source research and web fetching'
  },
  {
    level: 3,
    id: 'automation',
    name: 'Multi-Step Automation',
    description: 'Chain multiple operations together'
  },
  {
    level: 4,
    id: 'api_integration',
    name: 'API Integration',
    description: 'External API calls and data sync'
  },
  {
    level: 5,
    id: 'subagent_orchestration',
    name: 'Sub-Agent Orchestration',
    description: 'Spawn and manage sub-agents'
  },
  {
    level: 6,
    id: 'scheduled_tasks',
    name: 'Scheduled Tasks',
    description: 'Cron jobs and delayed execution'
  },
  {
    level: 7,
    id: 'cross_session_memory',
    name: 'Cross-Session Memory',
    description: 'Persistent context across sessions'
  },
  {
    level: 8,
    id: 'predictive_handling',
    name: 'Predictive Task Handling',
    description: 'Anticipate and prepare for common requests'
  },
  {
    level: 9,
    id: 'self_optimization',
    name: 'Self-Optimization',
    description: 'Analyze and improve own performance'
  },
  {
    level: 10,
    id: 'full_autonomy',
    name: 'Full Autonomy Mode',
    description: 'Operate with minimal oversight (human-in-loop)'
  }
];

function getSkillsForLevel(level) {
  return SKILL_TREE.filter(skill => skill.level <= level);
}

function getNewSkillsAtLevel(level, previousLevel) {
  if (level === previousLevel) return [];
  return SKILL_TREE.filter(skill => skill.level === level);
}

function unlockSkills(statsData, newLevel) {
  const newSkills = getNewSkillsAtLevel(newLevel, newLevel - 1);
  const newlyUnlocked = [];
  
  for (const skill of newSkills) {
    if (!statsData.skillsUnlocked.includes(skill.id)) {
      statsData.skillsUnlocked.push(skill.id);
      newlyUnlocked.push(skill);
    }
  }
  
  return newlyUnlocked;
}

function getSkillById(id) {
  return SKILL_TREE.find(s => s.id === id);
}

function getAllSkills() {
  return SKILL_TREE;
}

module.exports = {
  SKILL_TREE,
  getSkillsForLevel,
  getNewSkillsAtLevel,
  unlockSkills,
  getSkillById,
  getAllSkills
};
