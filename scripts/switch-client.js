const fs = require('fs');
const path = require('path');

const slotArg = process.argv[2];
if (!slotArg) {
  console.log('Usage: node scripts/switch-client.js <slot-number (01 - 05)>');
  console.log('Example: node scripts/switch-client.js 02');
  process.exit(1);
}

const slotNum = String(parseInt(slotArg, 10)).padStart(2, '0');
const clientFile = path.join(__dirname, '..', 'src', 'app', 'data', 'clients', `client-${slotNum}.ts`);

if (!fs.existsSync(clientFile)) {
  console.error(`Error: Client data file not found: ${clientFile}`);
  process.exit(1);
}

const activeFile = path.join(__dirname, '..', 'src', 'app', 'data', 'clients', 'active.ts');
const newContent = `export { client${slotNum}Data as activeClinicData } from "./client-${slotNum}";\n`;

fs.writeFileSync(activeFile, newContent, 'utf8');

// Read clinic name for user confirmation
const content = fs.readFileSync(clientFile, 'utf8');
const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
const clinicName = nameMatch ? nameMatch[1] : `Client ${slotNum}`;

console.log(`\n========================================`);
console.log(` Switched active client to Slot [${slotNum}]`);
console.log(` Clinic Name: ${clinicName}`);
console.log(` Target Repo: https://github.com/atharvpande07/dental-pitch-${slotNum}`);
console.log(` Live URL:    https://atharvpande07.github.io/dental-pitch-${slotNum}/`);
console.log(`========================================\n`);
