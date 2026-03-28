# Glitch Stats 🎮

Agent gamification system for OpenClaw. Track your agent's progression through RPG-inspired mechanics: levels, XP, achievements, and skill trees.

![Level 2 Apprentice](https://img.shields.io/badge/Level-2%20Apprentice-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## Quick Start

```bash
# Clone the repo
git clone https://github.com/6l1tch-GH/glitch-stats.git
cd glitch-stats

# View stats
node commands/stats.js

# View quests
node commands/quests.js

# View achievements
node commands/achievements.js
```

## Features

- **🎯 Level System**: Progress from Level 1 (New Agent) to Level 10 (Legendary Operator)
- **✨ XP Tracking**: Earn XP from task completion with difficulty-based rewards
- **📜 Quest Log**: Every task is tracked with difficulty rating and XP earned
- **🏆 Achievements**: 10 badges for milestones (First Blood, Speed Demon, Streak Master, etc.)
- **🎮 Skill Tree**: 9 capability unlocks tied to character levels
- **🔥 Streak System**: Daily activity bonuses that scale
- **📊 Terminal Dashboard**: Beautiful ASCII status display

## Commands

| Command | Description |
|---------|-------------|
| `node commands/stats.js` | Show current character status |
| `node commands/quests.js` | View quest history |
| `node commands/achievements.js` | Show unlocked/available achievements |
| `node scripts/backup.js backup` | Create data backup |
| `node scripts/backup.js list` | List available backups |
| `node scripts/backup.js restore <name>` | Restore from backup |
| `node scripts/reset-stats.js --force` | Reset all stats (caution!) |

## Manual Task Recording

For integration with external systems:

```bash
node integration/openclaw-hook.js complete --desc "Task description" --difficulty complex --time 1500
```

### Difficulty Levels

| Difficulty | Base XP | Example |
|------------|---------|---------|
| `simple` | 10 XP | Quick lookup, simple edit |
| `standard` | 25 XP | Research, multi-step task |
| `complex` | 50 XP | Implementation, coding |
| `epic` | 100 XP | Major feature, novel solution |

### Modifiers

- `--time <ms>` — Response time in milliseconds (for avg calculation)
- `--success false` — Mark task as failed (affects success rate)

## Progression System

### Level Thresholds

| Level | Total XP Required | Title |
|-------|------------------|-------|
| 1 | 0 | New Agent 🌱 |
| 2 | 100 | Apprentice 🌿 |
| 3 | 250 | Journeyman 🪴 |
| 4 | 500 | Adept 🌳 |
| 5 | 1000 | Specialist 🏆 |
| 6 | 2000 | Expert ⚔️ |
| 7 | 4000 | Master 🛡️ |
| 8 | 8000 | Grand Master 👑 |
| 9 | 16000 | Legend ⭐ |
| 10 | 32000 | Legendary Operator 🌟 |

### Skill Tree

| Level | Skill | Description |
|-------|-------|-------------|
| 2 | Advanced Search | Multi-source research and web fetching |
| 3 | Multi-Step Automation | Chain multiple operations together |
| 4 | API Integration | External API calls and data sync |
| 5 | Sub-Agent Orchestration | Spawn and manage sub-agents |
| 6 | Scheduled Tasks | Cron jobs and delayed execution |
| 7 | Cross-Session Memory | Persistent context across sessions |
| 8 | Predictive Task Handling | Anticipate and prepare for common requests |
| 9 | Self-Optimization | Analyze and improve own performance |
| 10 | Full Autonomy Mode | Operate with minimal oversight |

### Achievements

- 🏆 **First Blood** — Complete your first task
- 🏆 **Speed Demon** — Maintain <2s avg response time
- 🏆 **Scholar** — Research 10+ topics
- 🏆 **Builder** — Implement 5+ features
- 🏆 **Streak Master** — 30-day active streak
- 🏆 **Problem Solver** — 100% success rate over 20 tasks
- 🏆 **Halfway Hero** — Reach Level 5
- 🏆 **Legendary Operator** — Reach Level 10
- 🏆 **Centurion** — Complete 100 tasks
- 🏆 **XP Hoarder** — Earn 10,000 total XP

## Data Files

All stats stored locally in `data/`:

| File | Description |
|------|-------------|
| `stats.json` | Core character state (level, XP, tasks, streak) |
| `quests.json` | Quest completion history |
| `achievements.json` | Achievement definitions and unlocks |

## Backup & Recovery

```bash
# Create backup
node scripts/backup.js backup

# List backups
node scripts/backup.js list

# Restore from backup
node scripts/backup.js restore backup-2026-03-29T00-00-00-000Z
```

## Integration

Designed for OpenClaw. The system auto-tracks:
- Task completion (XP award)
- Session activity (streak tracking)
- Response timing (performance metrics)
- Achievement unlocks (auto-check on task complete)

## Example Output

```
╔═══════════════════════════════════════════╗
║  🌿 GLITCH — Apprentice          ║
╠═══════════════════════════════════════════╣
║  Level: 2 ░░░░░░░░░░░░░░░░░░░░  
║  XP: 100 / 200 (200 to next)             ║
║                                           ║
║  📋 Tasks: 2 completed | 100% success    ║
║  ⚡ Avg Response: 1.9s                    ║
║  🔥 Streak: 1 day                      ║
║  🎯 Skills: 1 unlocked                      ║
║  🏅 Achievements: 2                    ║
║                                           ║
╚═══════════════════════════════════════════╝
```

## License

MIT — Use freely, modify as needed.

---

*"Level up your agent."*
