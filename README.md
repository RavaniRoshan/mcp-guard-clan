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
   Copy the `.env.example` file to `.env` and fill in your Auth0 configuration:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Setting up Auth0 Authentication

1. Create an Auth0 account at [Auth0](https://auth0.com/)

2. Create a new Auth0 application (Single Page Application)

3. Configure the following settings in your Auth0 application:
   - Allowed Callback URLs: `http://localhost:8080`
   - Allowed Logout URLs: `http://localhost:8080`
   - Allowed Web Origins: `http://localhost:8080`

4. Enable Google connection in the Auth0 dashboard:
   - Go to Authentication > Social
   - Enable Google
   - Configure with your Google OAuth2 credentials

5. Copy your Auth0 configuration values to the `.env` file:
   ```
   VITE_AUTH0_DOMAIN=your_auth0_domain
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   VITE_AUTH0_AUDIENCE=your_auth0_api_identifier
   VITE_AUTH0_REDIRECT_URI=http://localhost:8080
   ```

6. Restart the development server

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
- Auth0 Authentication
- React Router
- TanStack Query
- Framer Motion
- Lucide React Icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.