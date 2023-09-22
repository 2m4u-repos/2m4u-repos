const fs = require('fs');
const fetch = require('node-fetch'); // Import the fetch module

// Define categories for Battle Pass Levels
const defineBattlePassPerformanceLevel = (battlePassLevel) => {
    // Determine the player's Battle Pass performance level based on their level
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
    // Determine the player's performance level based on total wins
    if (totalWins >= 1000) {
        return "FNCS Champ";
    } else if (totalWins >= 200) {
        return "Seasonal Veteran";
    } else if (totalWins >= 100) {
        return "Average Winner";
    } else {
        return "Casual Winner";
    }
};

async function generateReadme() {
    try {
        // Fetch Fortnite data from an API
        const fortniteData = await fetchFortniteData();

        if (!fortniteData) {
            console.error("Fortnite data not available.");
            return;
        }

        const { battlePass, stats: { all } } = fortniteData;

        // Categorize Battle Pass Level and Total Wins
        const xpGrinderLevel = defineBattlePassPerformanceLevel(battlePass.level);
        const totalWinsPerformanceLevel = defineTotalWinsPerformanceLevel(all.overall.wins);

        // Determine overall performance level based on both Battle Pass and Total Wins
        const performanceLevel = xpGrinderLevel === totalWinsPerformanceLevel
            ? xpGrinderLevel
            : `${totalWinsPerformanceLevel} (Total Wins) | ${xpGrinderLevel} (XP Level)`;

        // Create the README content
        const currentDate = new Date().toLocaleDateString();

        const readmeContent = `
# ✨ Fortnite Stats ✨

## Overview

- 🏆 **Current Level:** ${battlePass.level}
- 🎉 **Progress To Next Level:** ![Progress](https://geps.dev/progress/${battlePass.progress})
- 🎯 **Total Kills:** ${all.overall.kills.toLocaleString()}
- 💀 **Total Deaths:** ${all.overall.deaths.toLocaleString()}
- 👑 **Total Wins:** ${all.overall.wins.toLocaleString()}

## Performance

- **Performance Level:** ${performanceLevel}

## Last Updated

- **Last Updated:** ${currentDate}
`;
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

// Function to fetch Fortnite data from an API
async function fetchFortniteData() {
    // Function to fetch Fortnite data from an API
    try {
        // Construct the API URL using provided username
        const apiUrl = `https://fortnite-api.com/v2/stats/br/v2?name=${process.env.USERNAME}`;

        // Define request headers including Authorization
        const headers = {
            Authorization: process.env.API_SECRET,
            'User-Agent': 'Fortnite-Stats/1.0 - https://github.com/2m4u-repos/2m4u-repos', // Replace with your app's user agent
        };

        // Make the API request
        const response = await fetch(apiUrl, { headers });

        // Check for HTTP error status codes
        if (!response.ok) {
            console.error(`Fortnite API request failed with status ${response.status}`);
            return null;
        }

        // Parse the JSON response
        const fortniteData = await response.json();

        // Check for valid data structure
        if (!fortniteData || !fortniteData.data || !fortniteData.data.stats) {
            console.error("Data retrieval or structure is invalid.");
            return null;
        }
    } catch (e) { console.error(e) }
}
