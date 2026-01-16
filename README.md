# epigrams

[![Tests](https://github.com/benitogf/epigrams/actions/workflows/test.yml/badge.svg)](https://github.com/benitogf/epigrams/actions/workflows/test.yml)

A local-first rich text editor with encrypted persistence using IndexedDB.

## Features

- **Rich text editing** with Quill editor
- **Local persistence** - data stored in browser's IndexedDB
- **Encrypted storage** - content encrypted with AES-256
- **Dark theme** interface
- **Offline-capable** - works without internet connection

## Development

```bash
# Install dependencies
npm install

# Start dev server at localhost:5173
npm run dev

# Build for production (outputs to docs/)
npm run build

# Run unit tests
npm run test

# Run E2E tests (requires Firefox)
npm run test:e2e
```

## Tech Stack

- **Vite** - Build tool
- **React 18** - UI framework
- **Quill 2** - Rich text editor
- **Dexie** - IndexedDB wrapper
- **Vitest** - Unit testing
- **Playwright** - E2E testing
