# Regent Frontend

This is the frontend UI for Regent (regent.hops.works), a sovereign AI project deployed on Hopsworks.

## Overview

Regent provides a clean, user-friendly interface for interacting with various AI models. This repository contains the frontend UI component, based on the LibreChat project, customized for the Regent platform.

## Features

- Polished, ChatGPT-like user experience
- User-provided API keys (entered directly in the UI)
- Support for multiple AI models
- Clean and intuitive interface

## Deployment Instructions

1. Deploy directly from this repository:
   - Create a new project on [Vercel](https://vercel.com)
   - Connect to this GitHub repository
   - Use the following build settings:
     - Build Command: `cd frontend-only/client && npm install && npm run build`
     - Output Directory: `frontend-only/client/dist`
   - Environment Variables:
     - APP_TITLE: Regent
     - VITE_APP_TITLE: Regent
   - Set the domain to: regent.hops.works
   - Deploy!

## Project Structure

This repository is set up for direct deployment to Vercel:

- `/frontend-only/client` - The frontend React application (Vite)
- `/frontend-only/packages` - Supporting packages for the frontend
- `.env` - Environment configuration
- `vercel.json` - Vercel deployment configuration
- `package.json` - Project information and scripts

## Future Development

In future iterations, the Regent frontend will connect to a custom Hopsworks backend that provides:
- Authentication and user management
- Conversation history persistence
- Custom model integrations
- Enhanced security and privacy features

## Resources

- [Hopsworks Platform](https://www.hopsworks.ai/)
- [LibreChat GitHub Repository](https://github.com/danny-avila/LibreChat) (UI base)