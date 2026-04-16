# Game Hub

Game Hub is a modern web application for discovering video games, built using React and TypeScript. It integrates with an external API to provide real-time data, allowing users to browse, filter, and search games efficiently.

## Overview

This project demonstrates a scalable frontend architecture using reusable components, custom hooks, and clean state management patterns. It focuses on performance, maintainability, and user experience.

## Features

- Browse a collection of games from an external API
- Filter games by platform and genre
- Sort games based on relevance or rating
- Search games with controlled input and submission flow
- Responsive layout for multiple screen sizes
- Modular and reusable component structure
- Custom hooks for data fetching and separation of concerns

## Tech Stack

- React
- TypeScript
- Axios
- Tailwind CSS
- Vite

## Architecture Notes

### State Management

The application separates UI state and query state:

- `search` handles real-time input updates
- `query` represents committed filters used for API calls

This prevents unnecessary network requests and improves performance.

### Data Fetching

Data fetching is abstracted into custom hooks:

- `useGames`
- `useGenres`
- `usePlatforms`

This ensures:
- Reusability
- Cleaner components
- Better separation of concerns

### API Integration

The app uses Axios via a centralized API client: 
`services/api-client.ts`

Query parameters are dynamically passed based on user filters:
- `genres`
- `platforms`
- `ordering`
- `search`