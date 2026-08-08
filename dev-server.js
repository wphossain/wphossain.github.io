const { spawn } = require('child_process');

let port = '3000';

// Check process.argv for any port numbers (like 3000, 3001, etc.)
for (const arg of process.argv.slice(2)) {
  if (/^\d+$/.test(arg)) {
    port = arg;
    break;
  }
}

console.log(`[DevServer] Starting Next.js dev server on port ${port}...`);

const nextDev = spawn('npx', ['next', 'dev', '-p', port], { 
  stdio: 'inherit', 
  shell: true 
});

nextDev.on('close', (code) => {
  process.exit(code);
});
