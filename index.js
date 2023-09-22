const fs = require('fs');
const fetch = require('node-fetch'); // Import the fetch module

// Define categories for Battle Pass Levels
const defineBattlePassPerformanceLevel = (battlePassLevel) => {
  if (battlePassLevel >= 300) {
    return "Competitive XP Grinder";
  } else if (battlePassLevel >= 200) {
    return "Professional XP Grinder";
  } else if (battlePassLevel >= 150) {
    return "Elite XP Grinder";
  } else if (battlePassLevel >= 100) {
    return "Advance XP Grinder";
  } else if (battlePassLevel >= 50) {
    return "XP Grinder";
  } else {
    return "Casual Player";
  }
};

// Define categories for Total Wins
const defineTotalWinsPerformanceLevel = (totalWins) => {
  if (totalWins >= 1000) {
    return "FNCS Champ";
  } else if (totalWins >= 200) {
    return "Seasonal Veteran";
  } else {
    return "Casual Winner";
  }
};

async function generateReadme() {
  try {
    // Fetch Fortnite data
    const fortniteData = await fetchFortniteData();

    if (!fortniteData) {
      console.error("Fortnite data not available.");
      return;
    }

    const { battlePass, stats: { all } } = fortniteData;

    // Categorize Battle Pass Level
    const xpGrinderLevel = defineBattlePassPerformanceLevel(battlePass.level);

    // Categorize Total Wins
    const totalWinsPerformanceLevel = defineTotalWinsPerformanceLevel(all.overall.wins);

    // Determine overall performance level
    const performanceLevel = xpGrinderLevel === totalWinsPerformanceLevel
      ? xpGrinderLevel
      : `${totalWinsPerformanceLevel} (Total Wins) | ${xpGrinderLevel} (XP Level)`;

    // Create the README content
    const currentDate = new Date().toLocaleDateString();

    const readmeContent = `
## ✨ Fortnite Stats ✨

🏆 Current Level: ${battlePass.level}
🎉 Progress To Next Level: ![Progress](https://geps.dev/progress/${battlePass.progress})
🎯 Total Kills: ${all.overall.kills.toLocaleString()}
💀 Total Deaths: ${all.overall.deaths.toLocaleString()}
👑 Total Wins: ${all.overall.wins.toLocaleString()}
Performance Level: ${performanceLevel}
Last Updated: ${currentDate}`;

    // Specify the file path for the README.md
    const readmeFilePath = 'README.md';

    // Write the content to the README.md file
    fs.writeFileSync(readmeFilePath, readmeContent);

    console.log('README.md file generated successfully.');
  } catch (error) {
    console.error("An error occurred while generating the README:", error);
  }
}

// Call the function to generate the README
generateReadme();

// Function to fetch Fortnite data
async function fetchFortniteData() {
  try {
    const response = await fetch('https://fortnite-api.com/v2/stats/br/v2?name=OreoLeaks', {
      headers: {
        Authorization: 'b3ea7e1e-a57d-4c17-9c8e-e8bc80837feb',
      },
    });

    if (!response.ok) {
      console.error(`Fortnite API request failed with status ${response.status}`);
      return null;
    }

    const fortniteData = await response.json();

    if (!fortniteData || !fortniteData.data || !fortniteData.data.stats) {
      console.error("Data retrieval or structure is invalid.");
      return null;
    }

    return fortniteData.data;
  } catch (error) {
    console.error("An error occurred while fetching Fortnite data:", error);
    return null;
  }
}
