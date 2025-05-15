# Regent - Sovereign AI Project Guide

This document outlines the core principles and technical details of the Regent sovereign AI interface project.

## Core Principles

### European Values & Data Sovereignty
- **Self-hosted first**: Designed for local infrastructure and self-hosting
- **Privacy by design**: No tracking, telemetry or data leakage
- **Transparency**: Open-source and transparent operation
- **User control**: Full user control over data and AI interactions

### KISS (Keep It Simple, Stupid)
- Single purpose: Provide a clean sovereign interface to AI models
- Minimal dependencies, focused functionality
- No complicated state management or backend

### DRY (Don't Repeat Yourself)
- Reusable components and utility functions
- Shared styling through Tailwind classes
- Centralized API and storage logic
- Multilingual support with shared translation structure

### SOLID
- **Single Responsibility**: Each component has one job
- **Open/Closed**: Extend functionality without modifying core components
- **Liskov Substitution**: Components work with all expected props
- **Interface Segregation**: Minimal, focused props interfaces
- **Dependency Inversion**: Import from utilities, not implementation details

## Technical Structure

### Main Components
- `WelcomePage.tsx` - Multilingual welcome screen with BankID integration
- `ChatPage.tsx` - Responsive chat interface with language switching
- `SettingsDialog.tsx` - API key management
- `ChatHistory.tsx` - Collapsible sidebar for conversation history
- `BankIDLogin.tsx` - Swedish BankID authentication flow
- `LanguageSelector.tsx` - Multi-language selection component

### Core Utilities
- `i18n.ts` - Internationalization and translation management
- `api.ts` - AI model API integration with sovereign system prompting
- `storage.ts` - Local-first storage management
- `useChat.ts` - Chat logic and state management

### Design System
- Clean, Nordic-inspired aesthetic
- 1px border radius for a technical feel
- Main color: #1eb182 (Regent green)
- Light backgrounds for readability
- Responsive design for mobile and desktop
- Tailwind utility classes for consistent styling

## AI Model Integration

1. System prompt establishes sovereign AI identity
2. API key entered during onboarding or via settings
3. Stored in localStorage only, never transmitted except to model providers
4. Direct API connections to various AI model providers
5. No intermediary servers or tracking

## European Focus

- Swedish as default language
- BankID integration for Swedish users
- EU and Swedish identity elements
- Focus on data sovereignty and privacy
- Mobile-first design for European users
- Self-hosting friendly architecture

## Future Considerations

- Support for EU-based AI models
- Additional European languages and authentication methods
- Enhanced privacy features and local AI processing
- Accessibility improvements for diverse European users
- Maintain stateless, tracking-free architecture
- Keep commitment to data sovereignty and user control