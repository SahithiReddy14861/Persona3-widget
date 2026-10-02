# 🏎️ F1 Live Widget

A sleek, transparent desktop widget for Formula 1 fans built with **Tauri v2**, **React**, and **Vanilla CSS**. It provides live standings for both the Driver's and Constructor's championships right on your desktop, powered by the [OpenF1 API](https://openf1.org/).

## ✨ Features

- **Live Driver Leaderboard**: Real-time updates of the current F1 Driver Standings.
- **Live Constructor Teamboard**: Keep track of the team championship battles.
- **Trackmap View**: See the current race circuit layout.
- **Glassmorphism UI**: Beautiful translucent F1-themed aesthetics with full dark mode support.
- **Frameless Window**: Starts seamlessly pinned to the top-right of your screen without bulky window decorations.
- **Drag & Drop**: Easily move the widget around your screen using the drag handle.
- **Responsive Animations**: Features custom F1 red loading spinners and smooth hover transitions.

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Vanilla CSS
- **Backend**: Tauri v2 (Rust)
- **Data Source**: OpenF1 API

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/) (latest stable)
- OS-specific Tauri dependencies (see [Tauri v2 Prerequisites](https://v2.tauri.app/start/prerequisites/))

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <your-repo-url>
   cd F1-widget
   ```

2. Install JavaScript dependencies:
   ```bash
   npm install
   ```

3. Run the development server with Hot Module Replacement (HMR):
   ```bash
   npm run tauri dev
   ```

### Build for Production

To create a highly optimized, standalone executable for your operating system:
```bash
npm run tauri build
```
The compiled bundles and installers will be generated inside `src-tauri/target/release/bundle`.
