# YouTube Video Transcript

A powerful and easy-to-use Node.js library to fetch transcripts (captions/subtitles) from YouTube videos. This package supports handling auto-generated captions, multiple languages, and includes a caching mechanism for performance.

## Features

- 🚀 **Easy to use**: Simple Promise-based API.
- 🌍 **Multi-language support**: Fetch transcripts in specific languages.
- ⚡ **Caching**: Built-in support for In-Memory or File-System caching to save requests.
- 🛡️ **Robust**: Handles video availability checks and disabled captions gracefully.
- 📦 **Lightweight**: Minimal dependencies.

## Installation

```bash
npm install youtube-video-transcript
```

## Basic Usage

The simplest way to get a transcript is to just pass the YouTube video URL or ID:

```javascript
import { fetchTranscript } from 'youtube-video-transcript';

// Using a video URL
const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

try {
  const transcript = await fetchTranscript(url);
  
  // Output the first line
  console.log(transcript[0]); 
  // { 
  //   text: "We're no strangers to love", 
  //   duration: 4.5, 
  //   offset: 0.5, 
  //   lang: 'en' 
  // }
  
  // Print full text
  console.log(transcript.map(t => t.text).join(' '));
} catch (error) {
  console.error('Failed to fetch transcript:', error.message);
}
```

## Advanced Configuration

You can pass a configuration object as the second argument to control language, caching, and user-agent.

### Specifying Language

```javascript
await fetchTranscript('VIDEO_ID', { lang: 'es' }); // Fetch Spanish transcript
```

### Using Caching (Recommended)

To avoid hitting YouTube's servers repeatedly for the same video, you can enable caching.

**In-Memory Cache:**

```javascript
import { fetchTranscript, InMemoryCache } from 'youtube-video-transcript';

// Create a cache instance (default TTL: 1 hour)
const cache = new InMemoryCache();

await fetchTranscript('VIDEO_ID', { cache: cache });
```

**File-System Cache:**
Persists data to disk, so it survives app restarts.

```javascript
import { fetchTranscript, FsCache } from 'youtube-video-transcript';

// Save cache in a local 'tmp' folder
const cache = new FsCache('./tmp');

await fetchTranscript('VIDEO_ID', { cache: cache });
```

## API Reference

### `fetchTranscript(videoId, config)`

- **videoId** (string): The YouTube video URL or ID.
- **config** (optional object):
  - `lang` (string): Language code (e.g., 'en', 'fr').
  - `cache` (CacheStrategy): Implementation of a cache (InMemoryCache or FsCache).
  - `cacheTTL` (number): Time-to-live for cache in milliseconds.
  - `userAgent` (string): Custom User-Agent header.

### Return Value

Returns a `Promise` that resolves to an array of objects:
```typescript
[
  {
    text: string;      // The caption text
    duration: number;  // Duration of the caption in seconds
    offset: number;    // Start time in seconds
    lang: string;      // Language code
  },
  ...
]
```

## Error Handling

The package throws specific errors you can catch:

- `YoutubeTranscriptVideoUnavailableError`: Video is invalid or removed.
- `YoutubeTranscriptDisabledError`: Captions are disabled for this video.
- `YoutubeTranscriptNotAvailableError`: No captions found.
- `YoutubeTranscriptTooManyRequestError`: Rate limiting detected.

## License

MIT © Asim khan
