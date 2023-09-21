const { join } = require("path");
const fetch = require("node-fetch");
const { writeFileSync } = require("fs");
const os = require("os");
const osUtils = require("os-utils");


const definePerformanceLevel = (battlePassLevel, totalWins) => {
    if (battlePassLevel >= 300) {
        return "XP Grinder";
    } else if (battlePassLevel >= 200) {
        return "Professional XP Grinder";
    } else if (battlePassLevel >= 150) {
        return "Elite XP Grinder";
    } else if (battlePassLevel >= 100) {
        return "Advance XP Grinder";
    } else if (battlePassLevel >= 50) {
        return "Competitive XP Grinder";
    } else if (totalWins >= 1000) {
        return "FNCS Champ";
    } else if (totalWins >= 200) {
        return "Seasonal Veteran";
    } else {
        return "Casual Player";
    }
};

const processData = async () => {
    const start = new Date();

    const response = await fetch(`https://fortnite-api.com/v2/stats/br/v2?name=OreoLeaks`, {
        headers: {
            Authorization: "b3ea7e1e-a57d-4c17-9c8e-e8bc80837feb",
        },
    });

    if (!response.ok) {
        console.error(`Fortnite API request failed with status ${response.status}`);
        return;
    }

    const fortniteData = await response.json();

    if (!fortniteData || !fortniteData.data || !fortniteData.data.stats) {
        console.error("Data retrieval or structure is invalid.");
        return;
    }

    const { battlePass, stats: { all } } = fortniteData.data;

    // Define performance levels based on different criteria
    const performanceLevel = definePerformanceLevel(battlePass.level, all.overall.wins);

    // Measure script execution time
    const end = new Date();
    const executionTime = (end - start) / 1000; // Convert to seconds

    // Gather CPU usage data
    osUtils.cpuUsage((cpuUsage) => {
        // Gather disk space usage data
        

        // Write data to README or perform other actions
        const readMe = join(__dirname, "..", "README.md");
        const now = new Date();

        const text = `
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
        - RAM Free: ${os.freemem()} MB
        - Last Updated: ${now.toLocaleDateString()}
        `;
        console.log(performanceLevel)
        console.log(readMe,text)
        writeFileSync(readMe, text);
    });
};

processData();
