# Regent - Simple AI Chat Interface

A minimalist chat UI for interacting with OpenAI's API using your own API key.

## Features

- Clean, simple UI with technical aesthetic
- Local storage for chat history
- Uses your own OpenAI API key (stored in your browser only)
- No backend required - connects directly to OpenAI API

## Development

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The project is set up for easy deployment on Vercel:

1. Push to GitHub
2. Create a new Vercel project linked to your GitHub repository
3. Deploy

## Usage

1. Open the app and enter your OpenAI API key
2. Start a new conversation
3. Your chats are stored locally in your browser

## Technologies

- React
- Tailwind CSS
- Vite
- Axios for API requests
- React Router