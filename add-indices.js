#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Adds zero-based index prefixes to transcript files
 * Usage: node add-indices.js <episode-number>
 * Example: node add-indices.js 2
 *
 * This will read 2-dvd.md and 2-dplus.md and create:
 * - 2-dvd-indexed.md
 * - 2-dplus-indexed.md
 */

function addIndices(inputFile, outputFile) {
    const content = fs.readFileSync(inputFile, 'utf8');
    const lines = content.split('\n');

    let index = 0;
    const outputLines = [];

    for (let line of lines) {
        const trimmed = line.trim();

        // Skip title and empty lines
        if (!trimmed || trimmed.startsWith('Anthology,')) {
            outputLines.push(line);
            continue;
        }

        // Check if this is a timecode line (supports both MM:SS and HH:MM:SS)
        const timecodeMatch = trimmed.match(/^(\d{1,2}:\d{2}(?::\d{2})?)/);

        if (timecodeMatch) {
            // Add index prefix before the timecode
            outputLines.push(`[${index}] ${line}`);
            index++;
        } else {
            // Not a timecode line, just pass through
            outputLines.push(line);
        }
    }

    fs.writeFileSync(outputFile, outputLines.join('\n'), 'utf8');
    console.log(`✓ Created ${outputFile} with ${index} indexed entries`);
}

// Get episode number from command line
const episode = process.argv[2];

if (!episode) {
    console.error('Usage: node add-indices.js <episode-number>');
    console.error('Example: node add-indices.js 2');
    process.exit(1);
}

const dvdInput = `${episode}-dvd.md`;
const dvdOutput = `${episode}-dvd-indexed.md`;
const dplusInput = `${episode}-dplus.md`;
const dplusOutput = `${episode}-dplus-indexed.md`;

// Check files exist
if (!fs.existsSync(dvdInput)) {
    console.error(`Error: ${dvdInput} not found`);
    process.exit(1);
}

if (!fs.existsSync(dplusInput)) {
    console.error(`Error: ${dplusInput} not found`);
    process.exit(1);
}

// Process both files
console.log(`Processing episode ${episode}...`);
addIndices(dvdInput, dvdOutput);
addIndices(dplusInput, dplusOutput);

console.log('\n✓ Done! You can now use the indexed files to create mappings.');
console.log(`  - ${dvdOutput}`);
console.log(`  - ${dplusOutput}`);
