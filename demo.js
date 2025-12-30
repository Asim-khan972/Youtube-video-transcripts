import { fetchTranscript } from './dist/index.js';
import fs from 'fs/promises';
import path from 'path';

async function main() {
    const videos = [
        'https://www.youtube.com/watch?v=WI8PxxBiShg', // Example video
    ];

    for (const video of videos) {
        console.log(`\n--- Fetching transcript for: ${video} ---`);
        try {
            const transcript = await fetchTranscript(video);
            console.log(`Success! Found ${transcript.length} lines.`);

            const fullText = transcript.map(t => t.text).join(' ');
            console.log('\n--- First 200 characters of transcript ---');
            console.log(fullText.substring(0, 200) + '...');
            console.log('------------------------------------------');

        } catch (error) {
            console.error('Error fetching transcript:', error.message);
            if (error.cause) console.error('Cause:', error.cause);
        }
    }
}

main();
