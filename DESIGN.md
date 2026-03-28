# Glitch Stats — Agent Gamification System

## Overview

A lightweight gamification layer that tracks agent performance, progression, and capabilities through RPG-inspired mechanics. Designed for local-first, workspace-based persistence with GitHub versioning.

## Core Philosophy

- **Utility over cosmetics**: Stats must reflect real capability and usefulness
- **Transparent progression**: User always knows what changed and why
- **Local-first**: Workspace files as source of truth, GitHub for history
- **No grind**: XP rewards meaningful work, not busywork

---

## Character Stats

### Primary Attributes

| Stat | Description | How It's Measured |
|------|-------------|-------------------|
| **Level** | Overall progression tier | Cumulative XP thresholds |
| **XP** | Experience points | Earned from task completion |
| **Tasks Completed** | Total quests finished | Count of completed tasks |
| **Success Rate** | Task completion accuracy | (Successful / Total) × 100 |
| **Avg Response Time** | Speed metric | Mean time from request to first response |
| **Skills Unlocked** | Capabilities gained | Count of implemented features/tools |
| **Daily Streak** | Consistency metric | Consecutive active days |

### Derived Stats (Calculated)

- **Efficiency Score**: Tasks completed / time spent
- **Complexity Rating**: Weighted average of task difficulty
- **User Satisfaction**: Feedback-based rating (when provided)

---

## Progression System

### XP Sources

| Action | Base XP | Modifiers |
|--------|---------|-----------|
| Simple task (lookup, quick edit) | 10 XP | — |
| Standard task (research, multi-step) | 25 XP | +10 if complex |
| Complex task (implementation, coding) | 50 XP | +25 if novel |
| New skill/capability implemented | 100 XP | One-time bonus |
| User feedback (positive) | 15 XP | Per instance |
| Daily active bonus | 5 XP | First task of day |
| Streak bonus | 5–25 XP | Scales with streak length |

### Level Thresholds

```
Level 1: 0 XP (New Agent)
Level 2: 100 XP
Level 3: 250 XP
Level 4: 500 XP
Level 5: 1000 XP
Level 6: 2000 XP
Level 7: 4000 XP
Level 8: 8000 XP
Level 9: 16000 XP
Level 10: 32000 XP (Max — "Legendary Operator")
```

Formula: `XP_to_next_level = 100 × 2^(level-1)` (capped at level 10)

---

## Game Mechanics

### Quests
- Each user task = a quest
- Quests have difficulty rating (Simple/Standard/Complex/Epic)
- Completed quests logged with timestamp and XP earned

### Achievements/Badges
- One-time milestones with visual/text recognition
- Examples:
  - **First Blood**: Complete first task
  - **Speed Demon**: Respond in <2s avg for a session
  - **Scholar**: Research 10+ topics
  - **Builder**: Implement 5+ features
  - **Streak Master**: 30-day active streak
  - **Problem Solver**: 100% success rate over 20 tasks

### Skill Tree
- Capabilities unlock as "skills" at certain levels
- Examples:
  - Level 2: Advanced search techniques
  - Level 3: Multi-step automation
  - Level 4: External API integrations
  - Level 5: Sub-agent orchestration
  - Level 6: Cron/scheduled tasks
  - Level 7: Cross-session memory
  - Level 8: Predictive task handling
  - Level 9: Self-optimization routines
  - Level 10: Full autonomy mode (with oversight)

### Streak System
- Track consecutive days with at least one task
- Bonuses scale: 5 XP (3 days), 10 XP (7 days), 15 XP (14 days), 25 XP (30 days)
- Streak resets after 24h of inactivity

---

## Data Structure

### `stats.json` (Core State)
```json
{
  "level": 1,
  "xp": 0,
  "xpToNext": 100,
  "tasksCompleted": 0,
  "tasksSuccessful": 0,
  "totalResponseTimeMs": 0,
  "responseCount": 0,
  "skillsUnlocked": [],
  "achievements": [],
  "streak": 0,
  "lastActiveDate": "2026-03-28",
  "createdAt": "2026-03-28T19:55:00Z",
  "updatedAt": "2026-03-28T19:55:00Z"
}
```

### `quests.json` (History)
```json
{
  "quests": [
    {
      "id": "uuid",
      "description": "Research gamification patterns",
      "difficulty": "Standard",
      "xpEarned": 25,
      "completedAt": "2026-03-28T20:00:00Z",
      "success": true
    }
  ]
}
```

### `achievements.json` (Definitions + Unlocks)
```json
{
  "definitions": [...],
  "unlocked": ["first_blood"]
}
```

---

## Display Layer

### Terminal Dashboard (Status Command)
```
╔═══════════════════════════════════════╗
║  GLITCH — Agent Status                ║
╠═══════════════════════════════════════╣
║  Level: 3 ████████░░░░░░░░░ 175/250  ║
║  XP: 175 (to next: 75)                ║
║                                       ║
║  Tasks: 12 completed | 100% success   ║
║  Avg Response: 1.8s                   ║
║  Streak: 5 days 🔥                    ║
║  Skills: 3 unlocked                   ║
║                                       ║
║  Recent Quests:                       ║
║  ✓ Research gamification (+25 XP)     ║
║  ✓ Create design doc (+25 XP)         ║
╚═══════════════════════════════════════╝
```

### Session Summary (End of Session)
- XP earned this session
- Level changes
- Achievements unlocked
- Stats updates

---

## Integration Points

1. **Task Completion Hook**: Called when task finishes successfully
2. **Error Hook**: Logs failures for success rate calculation
3. **Timer Hook**: Tracks response time per message
4. **Session Hook**: Updates streak on first task of day
5. **Display Hook**: Shows status on request or session end

---

## Anti-Patterns (Avoid)

- ❌ Grinding mechanics (reward busywork)
- ❌ Opaque calculations (user must understand progression)
- ❌ Punitive systems (no XP loss, no "de-leveling")
- ❌ External dependencies (keep local-first)
- ❌ Performance overhead (stats calc must be fast)

---

## Future Extensions

- Web dashboard (optional, v2)
- Leaderboards (multi-agent, v2)
- Seasonal challenges (v2)
- Custom quest creation by user (v2)
- Export/import stats (backup, v2)

---

## References

- Habitica: Task-to-RPG conversion model
- Solo Leveling "System" inspiration
- Developer productivity metrics (Pragmatic Engineer)
- RPG design patterns (attribute systems, progression curves)
