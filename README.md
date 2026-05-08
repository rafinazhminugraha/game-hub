# Gamicus

Gamicus is a modern, high-performance web application built with React 19 and TypeScript for discovering and exploring video games. It leverages the [RAWG API](https://rawg.io/api) to provide a rich browsing experience with real-time data, infinite scrolling, and advanced filtering capabilities.

The application is deployed and can be accessed at:
[https://gamicus-nazhmi.vercel.app](https://gamicus-nazhmi.vercel.app)

## Overview

This project is a showcase of a professional, "robust-first" frontend architecture. It goes beyond simple API integration by implementing strict runtime validation, sophisticated server-state caching, and comprehensive unit testing. The codebase is designed for scalability, maintainability, and a premium user experience.

## Features

- **Game Discovery**: Browse thousands of games with seamless infinite scroll pagination.
- **Smart Search**: Debounced search input (500ms) to optimize performance and API usage.
- **Advanced Filtering**: Filter by genre (mobile-friendly drawer) and gaming platform.
- **Dynamic Sorting**: Sort by rating, release date, or relevance.
- **Rich Details**: Deep-dive into game descriptions, platform availability, and system requirements.
- **Responsive Design**: Pixel-perfect layouts for desktop and mobile using Tailwind CSS 4.
- **Theming**: Integrated dark and light mode support.
- **Production-Grade UX**: Loading skeletons, error boundaries, and empty state handling.

## Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core** | React 19 + TypeScript 6 | Component-based UI with strict type safety |
| **Build Tool** | Vite 8 | Ultra-fast development and optimized builds |
| **Styling** | Tailwind CSS 4 | Utility-first styling with modern CSS features |
| **Server State** | TanStack React Query 5 | Caching, synchronization, and infinite scroll |
| **UI State** | Zustand 5 | Lightweight global UI state management |
| **Routing** | React Router 7 | Client-side routing with data loaders |
| **Validation** | Zod 4 | Strict runtime validation of API responses |
| **API Client** | Axios | Promise-based HTTP requests with abort support |
| **Testing** | Vitest + RTL | Unit and integration testing with 100% pass rate |

## Architecture Notes

### 1. Robust Data Flow & Validation
Unlike traditional apps that trust API responses, Gamicus uses **Zod** to validate every payload at the service layer. This ensures that sparse or malformed data from the external API never crashes the UI, providing a 100% robust runtime environment.

### 2. State Management Strategy
- **Server State**: Managed by TanStack Query, providing automatic caching (5m staleTime), background refetching, and simplified infinite scroll logic.
- **UI State**: Managed by Zustand for lightweight interactions (e.g., mobile drawer state) to avoid prop drilling and unnecessary re-renders.
- **URL State**: Search parameters and filters are synced with the URL, allowing for shareable links and browser history support.

### 3. Performance Optimizations
- **IntersectionObserver**: Automatically fetches the next page 400px before the user reaches the bottom.
- **Search Debouncing**: Prevents API spamming by waiting for user intent.
- **Route Prefetching**: Data is prefetched in loaders before the component even renders.
- **Code Splitting**: Automatic optimization via Vite for faster initial loads.

### 4. Testing & Reliability
The project maintains a **100% test pass rate** using Vitest and React Testing Library. Tests cover critical user flows including:
- Search input behavior and debouncing.
- Infinite scroll sentinel triggers.
- API response validation and error handling.
- Theme switching and responsive layout changes.

## Quick Start

```bash
# Install dependencies
npm install

# Setup Environment
echo "VITE_RAWG_API_KEY=your_api_key" > .env.local

# Run Development Server
npm run dev

# Run Tests
npm run test

# Build for Production
npm run build
```