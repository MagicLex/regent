# Regent Project Guide

This document outlines the core principles and technical details of the Regent project.

## Core Principles

### KISS (Keep It Simple, Stupid)
- Single purpose: Provide a clean interface to OpenAI API
- Minimal dependencies, focused functionality
- No complicated state management or backend

### DRY (Don't Repeat Yourself)
- Reusable components and utility functions
- Shared styling through Tailwind classes
- Centralized API and storage logic

### SOLID
- **Single Responsibility**: Each component has one job
- **Open/Closed**: Extend functionality without modifying core components
- **Liskov Substitution**: Components work with all expected props
- **Interface Segregation**: Minimal, focused props interfaces
- **Dependency Inversion**: Import from utilities, not implementation details

## Technical Structure

### Main Components
- `WelcomePage.tsx` - Entry point and API key collection
- `ChatPage.tsx` - Main chat interface
- `SettingsDialog.tsx` - API key management

### Core Utilities
- `api.ts` - OpenAI API integration
- `storage.ts` - localStorage management
- `useChat.ts` - Chat logic hook

### Design System
- Simple, technical aesthetic
- 1px border radius
- Main color: #1eb182
- Light gray borders
- Tailwind utility classes

## API Handling

1. API key optionally entered during onboarding or via settings
2. Stored in localStorage only
3. Used for direct OpenAI API calls
4. No server-side code required

## Future Considerations

- Keep the UI clean and focused
- Avoid feature bloat
- Always prioritize simplicity
- No user tracking or telemetry
- Maintain stateless architecture