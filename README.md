# Glitch Stats 🎮

Agent gamification system for OpenClaw. Track your agent's progression through RPG-inspired mechanics: levels, XP, achievements, and skill trees.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/6l1tch/glitch-stats.git
cd glitch-stats

# Initialize data files
node scripts/init.js

# View stats
node commands/stats.js
```

## Features

- **Level System**: Progress from Level 1 to Level 10 (Legendary Operator)
- **XP Tracking**: Earn XP from task completion, bonuses, and streaks
- **Quest Log**: Every task is a quest with difficulty rating
- **Achievements**: Unlock badges for milestones
- **Skill Tree**: Capabilities unlock as you level up
- **Streak System**: Daily activity bonuses
- **Terminal Dashboard**: ASCII status display

## Commands

| Command | Description |
|---------|-------------|
| `/stats` | Show current character status |
| `/quests` | View quest history |
| `/achievements` | Show unlocked and available achievements |
| `/reset-stats` | Reset all stats (requires confirmation) |

## Data Files

All stats stored locally in `data/`:
- `stats.json` — Core character state
- `quests.json` — Quest completion history
- `achievements.json` — Achievement definitions and unlocks

## Integration

Designed for OpenClaw. Hooks into:
- Task completion (XP award)
- Session start/end (streak tracking, summaries)
- Response timing (performance metrics)

## License

MIT — Use freely, modify as needed.

---

*"Level up your agent."*
