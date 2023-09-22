const fs = require('fs');
const os = require('os'); // Import the os module for RAM information

// Define your Fortnite stats data
const battlePass = {
  level: 100, // Replace with the actual level
  progress: 50, // Replace with the actual progress
};

const all = {
  overall: {
    kills: 1000, // Replace with the actual number of kills
    deaths: 500, // Replace with the actual number of deaths
    wins: 200, // Replace with the actual number of wins
  },
};

const performanceLevel = 'High'; // Replace with the actual performance level
const executionTime = 0.5; // Replace with the actual execution time
const cpuUsage = 20.5; // Replace with the actual CPU usage

// Function to generate a README content
function generateReadme() {
  const currentDate = new Date().toLocaleDateString();
  const now = new Date();

  return `
## ✨ Fortnite Stats ✨

🏆 Current Level: ${battlePass.level}
🎉 Progress To Next Level: ![Progress](https://geps.dev/progress/${battlePass.progress})
🎯 Total Kills: ${all.overall.kills.toLocaleString()}
💀 Total Deaths: ${all.overall.deaths.toLocaleString()}
👑 Total Wins: ${all.overall.wins.toLocaleString()}
Performance Level: ${performanceLevel}

### Optimization Data:

- Script Execution Time: ${executionTime.toFixed(2)} seconds
- CPU Usage: ${cpuUsage.toFixed(2)}%
- RAM Free: ${os.freemem() / (1024 * 1024)} MB
- Last Updated: ${now.toLocaleDateString()}
  `;
}

// Specify the file path for the README.md
const readmeFilePath = 'README.md';

// Generate README content
const readmeContent = generateReadme();

// Write the content to the README.md file
fs.writeFileSync(readmeFilePath, readmeContent);

console.log('README.md file generated successfully.');
