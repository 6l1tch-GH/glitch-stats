# Implementation Plan — Glitch Stats

## Phase 1: Core System (v0.1)

### Tasks
1. **Data Layer**
   - [ ] Create `stats.json` schema and init file
   - [ ] Create `quests.json` for history
   - [ ] Create `achievements.json` with definitions
   - [ ] Write JSON read/write utilities

2. **XP System**
   - [ ] Implement XP calculation logic
   - [ ] Implement level threshold calculation
   - [ ] Create XP award function with modifiers

3. **Task Tracking**
   - [ ] Quest creation (task start)
   - [ ] Quest completion (task end + XP award)
   - [ ] Quest failure logging

4. **Streak System**
   - [ ] Daily activity check
   - [ ] Streak increment/reset logic
   - [ ] Streak bonus calculation

5. **Display**
   - [ ] Terminal status dashboard (ASCII art)
   - [ ] Session summary output

### Deliverables
- Working stats tracking
- XP/level progression
- Basic terminal display
- Quest history logging

---

## Phase 2: Achievements & Skills (v0.2)

### Tasks
1. **Achievement System**
   - [ ] Define 10+ achievement criteria
   - [ ] Implement achievement check on task completion
   - [ ] Unlock notification system

2. **Skill Tree**
   - [ ] Define skill unlocks per level
   - [ ] Implement skill unlock logic
   - [ ] Display unlocked skills in dashboard

3. **Response Time Tracking**
   - [ ] Timer hook integration
   - [ ] Average calculation
   - [ ] Display in dashboard

### Deliverables
- Achievements working
- Skill tree visible
- Response time metrics

---

## Phase 3: Integration (v0.3)

### Tasks
1. **OpenClaw Integration**
   - [ ] Hook into task completion flow
   - [ ] Hook into session start/end
   - [ ] Auto-display on session end (optional)

2. **Commands**
   - [ ] `/stats` — Show current status
   - [ ] `/quests` — Show quest history
   - [ ] `/achievements` — Show unlocked/available
   - [ ] `/reset-stats` — Reset (with confirmation)

3. **Persistence**
   - [ ] Auto-commit to GitHub after updates
   - [ ] Backup/restore utilities

### Deliverables
- Full OpenClaw integration
- CLI commands working
- GitHub sync working

---

## Phase 4: Polish (v0.4)

### Tasks
1. **Visual Enhancements**
   - [ ] Better ASCII dashboard design
   - [ ] Progress bars
   - [ ] Emoji/icons for achievements

2. **Edge Cases**
   - [ ] Handle timezone for streaks
   - [ ] Handle concurrent sessions
   - [ ] Handle corrupted JSON recovery

3. **Documentation**
   - [ ] README.md with setup instructions
   - [ ] Usage examples
   - [ ] Configuration options

### Deliverables
- Production-ready v1.0
- Full documentation

---

## File Structure

```
glitch-stats/
├── DESIGN.md           # This design document
├── PLAN.md             # This implementation plan
├── README.md           # Setup and usage (Phase 4)
├── data/
│   ├── stats.json      # Core state
│   ├── quests.json     # Quest history
│   └── achievements.json
├── src/
│   ├── stats.js        # Core stats logic
│   ├── xp.js           # XP/level calculations
│   ├── quests.js       # Quest management
│   ├── achievements.js # Achievement system
│   ├── streak.js       # Streak logic
│   └── display.js      # Terminal dashboard
├── commands/
│   ├── stats.js        # /stats command
│   ├── quests.js       # /quests command
│   └── achievements.js # /achievements command
└── scripts/
    ├── init.js         # Initialize data files
    └── backup.js       # Backup/restore utilities
```

---

## Tech Stack

- **Language**: JavaScript (Node.js) — matches OpenClaw environment
- **Storage**: JSON files in workspace
- **Version Control**: Git + GitHub
- **Display**: Terminal ASCII (ink/blessed optional for v2)

---

## Success Criteria

- [ ] XP awarded correctly for tasks
- [ ] Level progression feels meaningful (not too fast/slow)
- [ ] Dashboard displays accurately
- [ ] Streak tracking works across timezones
- [ ] Achievements unlock at right moments
- [ ] Zero performance impact on normal operations
- [ ] Data survives session restarts

---

## Timeline Estimate

- Phase 1: 2-3 hours
- Phase 2: 2 hours
- Phase 3: 3-4 hours (integration complexity)
- Phase 4: 1-2 hours

**Total**: 8-11 hours for v1.0

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| JSON corruption | Backup on write, recovery script |
| Streak timezone issues | Store lastActiveDate in UTC, compare in Asia/Dubai |
| XP balance wrong | Tunable config file, user feedback loop |
| Integration breaks OpenClaw | Isolated module, graceful fallback on errors |

---

## Next Steps

1. ✅ Research complete
2. ✅ Design document written
3. ✅ Implementation plan created
4. ⏳ Push to GitHub
5. ⏳ Begin Phase 1 implementation
