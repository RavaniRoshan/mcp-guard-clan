# MCP Security Guardian

Advanced security monitoring for Model Context Protocol servers. Detect prompt injection, tool poisoning, and context manipulation attacks in real-time with AI-powered threat analysis.

## Features

- Real-time threat detection using GPT-5-codex and DeepSeek V3.1
- Instant response to block malicious requests
- Attack replay and analysis capabilities
- Smart alerting to reduce false positives
- Easy integration with any MCP server implementation
- Breach reporting for threat intelligence sharing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy the `.env.example` file to `.env` and fill in your Firebase configuration:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Setting up Google Authentication

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Enable Google authentication in the Firebase Authentication section

3. Copy your Firebase configuration values to the `.env` file:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Restart the development server

## Project Structure

- `/src` - Main source code
  - `/components` - React components
  - `/auth` - Authentication related files
  - `/lib` - Utility functions and API clients
  - `/hooks` - Custom React hooks
- `/server` - Mock API server

## Available Scripts

- `npm run dev` - Start the development server
- `npm run server` - Start the mock API server
- `npm run dev:all` - Start both the web app and mock API server
- `npm run build` - Build the production version
- `npm run preview` - Preview the production build

## Technologies Used

- React with TypeScript
- Vite
- Tailwind CSS
- Firebase Authentication
- React Router
- TanStack Query
- Framer Motion
- Lucide React Icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.