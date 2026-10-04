const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const slotArg = process.argv[2];
if (!slotArg) {
  console.log('Usage: node scripts/deploy-pitch.js <slot-number (01 - 10)>');
  console.log('Example: node scripts/deploy-pitch.js 02');
  process.exit(1);
}

const slotNum = String(parseInt(slotArg, 10)).padStart(2, '0');
const repoName = `dental-pitch-${slotNum}`;
const remoteName = `pitch-${slotNum}`;

// 1. Switch client first
execSync(`node "${path.join(__dirname, 'switch-client.js')}" ${slotNum}`, { stdio: 'inherit' });

// 2. Commit changes
console.log(`Staging and committing branding for ${repoName}...`);
try {
  execSync('git add -A', { stdio: 'inherit' });
  execSync(`git commit -m "Deploy branding for ${repoName}"`, { stdio: 'inherit' });
} catch (e) {
  console.log('No new local changes to commit or working tree clean.');
}

// 3. Push to specific remote
console.log(`Deploying to GitHub repository: ${repoName} (${remoteName})...`);
try {
  execSync(`git push ${remoteName} main`, { stdio: 'inherit' });
  console.log(`\n========================================`);
  console.log(` PITCH DEPLOYED SUCCESSFULLY!`);
  console.log(` Slot:     ${slotNum}`);
  console.log(` Repo:     https://github.com/atharvpande07/${repoName}`);
  console.log(` Live URL: https://atharvpande07.github.io/${repoName}/`);
  console.log(`========================================\n`);
} catch (pushErr) {
  console.error(`Error deploying to ${remoteName}:`, pushErr.message);
}
