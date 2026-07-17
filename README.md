# Deadline Planner - Desktop Application

A modern, cross-platform desktop application for task and deadline management, built with Electron, React, and TypeScript.

## 📋 Overview

**Deadline Planner** is a productivity tool designed to help users efficiently manage their tasks and deadlines. The application features a sleek desktop interface with data visualization capabilities to track progress and deadlines at a glance.

## ✨ Features

- **Task Management**: Create, update, and organize tasks with deadline tracking
- **Data Visualization**: Interactive charts and graphs using Recharts for deadline and task analytics
- **Cross-Platform**: Runs on Windows, macOS, and Linux with native desktop experience
- **Type-Safe Development**: Built with TypeScript for robust code quality
- **Modern UI**: React-based interface with responsive design
- **Auto-Updates**: Integrated electron-updater for seamless application updates

## 🛠 Tech Stack

- **Frontend**: React 19.2 + TypeScript 5.9
- **Desktop Framework**: Electron 39.2 with Electron Vite
- **Visualization**: Recharts 3.8 for interactive charts
- **Utilities**: date-fns 4.1 for date manipulation
- **Code Quality**: ESLint + Prettier for code formatting and linting
- **Build Tool**: Electron Vite 5.0 for fast development and production builds
- **Package Manager**: npm with electron-builder for desktop packaging

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
npm install
```

### Development

Launch the development server with hot reload:

```bash
npm run dev
```

### Build

Build the application for your platform:

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

### Code Quality

```bash
# Run type checking
npm run typecheck

# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint
```

## 📁 Project Structure

```
src/
├── main/          # Electron main process
└── renderer/      # React components and UI
```

- **Main Process**: Handles window management, system integration, and native APIs
- **Renderer Process**: React application for the UI and user interactions

## 📊 Key Capabilities

- **Deadline Tracking**: Visual indicators for approaching and overdue deadlines
- **Task Analytics**: Charts showing task completion rates and deadline trends
- **Persistent Storage**: Save tasks locally for offline access
- **Auto-Updates**: Stay up-to-date with the latest features and fixes

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build application with type checking |
| `npm run build:win` | Create Windows installer |
| `npm run build:mac` | Create macOS bundle |
| `npm run build:linux` | Create Linux package |
| `npm run format` | Format code with Prettier |
| `npm run lint` | Run ESLint checks |
| `npm run typecheck` | Verify TypeScript types |

## 📦 Project Details

- **Name**: deploymenttask1-deadline-planner
- **Version**: 1.1.0
- **Created**: March 2026
- **Language**: TypeScript
- **Platform**: Electron

## 📝 IDE Setup

Recommended tools for development:

- **VSCode** - Code editor
- **ESLint Extension** - Real-time linting
- **Prettier Extension** - Code formatting

## 📚 Resources

- [Electron Vite Documentation](https://electron-vite.org)
- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev)

## 📄 License

This project is part of the SWE40006 coursework.

## 👤 Author

**Jewel Lai**

---

*For more information about this project, visit the [repository](https://github.com/Jewelllllai/SWE40006-DeploymentTask1).*
