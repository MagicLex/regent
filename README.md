# Regent

![Regent Logo](https://img.shields.io/badge/%F0%9F%91%91-Regent-1eb182)

A minimal, elegant interface for interacting with OpenAI's GPT models in your browser.

## Overview

Regent provides a clean, focused chat experience with GPT models, requiring only your OpenAI API key. No accounts, no data collection, no complexity.

## Features

- **Distraction-free UI** with technical aesthetic
- **Client-side only** - your API key and conversations stay in your browser
- **No backend** required - connects directly to OpenAI API
- **Local storage** for chat history persistence

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

Deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMagicLex%2Fregent)

## Usage

1. Visit the app
2. Optionally add your OpenAI API key in Settings
3. Start chatting

## Architecture

Built with a focus on simplicity:

- React for UI components
- Tailwind CSS for styling
- localStorage for persistence
- Direct OpenAI API integration
- No external state management

## License

MIT