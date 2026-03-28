#!/usr/bin/env node

// Backup and restore utilities

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DATA_DIR = path.join(__dirname, '..', 'data');
const BACKUP_DIR = path.join(__dirname, '..', 'backups');

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function backup() {
  ensureBackupDir();
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUP_DIR, `backup-${timestamp}`);
  
  fs.mkdirSync(backupPath, { recursive: true });
  
  // Copy all data files
  const files = ['stats.json', 'quests.json', 'achievements.json'];
  files.forEach(file => {
    const src = path.join(DATA_DIR, file);
    const dest = path.join(backupPath, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`✓ Backed up ${file}`);
    }
  });
  
  console.log(`\n✅ Backup created: ${backupPath}`);
  return backupPath;
}

function restore(backupName) {
  const backupPath = path.join(BACKUP_DIR, backupName);
  
  if (!fs.existsSync(backupPath)) {
    console.error(`❌ Backup not found: ${backupName}`);
    console.log('Available backups:');
    if (fs.existsSync(BACKUP_DIR)) {
      const backups = fs.readdirSync(BACKUP_DIR);
      backups.forEach(b => console.log(`  - ${b}`));
    }
    process.exit(1);
  }
  
  // Copy all data files back
  const files = ['stats.json', 'quests.json', 'achievements.json'];
  files.forEach(file => {
    const src = path.join(backupPath, file);
    const dest = path.join(DATA_DIR, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`✓ Restored ${file}`);
    }
  });
  
  console.log(`\n✅ Restored from: ${backupName}`);
}

function listBackups() {
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log('No backups found');
    return;
  }
  
  const backups = fs.readdirSync(BACKUP_DIR);
  console.log('Available backups:');
  backups.forEach(b => {
    const backupPath = path.join(BACKUP_DIR, b);
    const stat = fs.statSync(backupPath);
    console.log(`  - ${b} (${stat.mtime.toLocaleString()})`);
  });
}

const [,, action, arg] = process.argv;

switch (action) {
  case 'backup':
    backup();
    break;
  case 'restore':
    if (!arg) {
      console.error('Usage: node scripts/backup.js restore <backup-name>');
      process.exit(1);
    }
    restore(arg);
    break;
  case 'list':
    listBackups();
    break;
  default:
    console.log('Backup/Restore Utilities');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/backup.js backup   - Create new backup');
    console.log('  node scripts/backup.js list     - List available backups');
    console.log('  node scripts/backup.js restore <name> - Restore from backup');
    process.exit(0);
}
