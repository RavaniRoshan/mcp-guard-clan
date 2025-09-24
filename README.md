# MCP Security Guardian

**A plug-and-play AI security solution for MCP servers.**

## 🛡️ About the Project

MCP Security Guardian is designed for solo builders and SaaS founders who use Model Context Protocol (MCP) servers, which are now widely adopted by major AI labs. With the rise of sophisticated prompt injection and data exfiltration attacks, this tool provides an instant layer of security, enabling you to detect threats, document attacks, and build trust with your users.

## ✨ Core Features

-   **🤖 Real-time MCP Server Monitoring:** Automatically connects to any MCP-compliant server to track I/O streams for prompt injection, tool poisoning, and unauthorized data requests.
-   **🔍 Threat Pattern Detection:** Uses GPT-5-codex and DeepSeek V3.1 to analyze model session traces, flag suspicious behavior, and categorize attacks.
-   **📼 Attack Logging & Replay:** Securely stores detailed session logs and allows for attack "replays" and reviews within a dedicated dashboard.
-   **📝 Instant Breach Summaries:** Generates tweet-ready threads summarizing confirmed breaches to help maintain transparency and technical credibility.
-   **⚙️ Developer Hooks:** Simple webhooks and APIs allow for easy integration of live security dashboards directly into your MCP environments.
-   **🍯 Honeypot Deployment:** Enables you to set up public honeypot MCP servers to capture, test, and research live attacks.

## 🛠️ Tech Stack

This project is built with a modern frontend stack:

-   **Vite:** For a fast and lean development experience.
-   **React:** For building the user interface.
-   **TypeScript:** For type-safe code.
-   **Tailwind CSS:** For styling the application.
-   **shadcn/ui:** For a set of reusable UI components.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (v18 or higher) and `npm` or `bun` installed.

### Installation

1.  Clone the repo:
    ```sh
    git clone <YOUR_GIT_URL>
    ```
2.  Navigate to the project directory:
    ```sh
    cd mcp-security-guardian
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
    or if you use bun:
    ```sh
    bun install
    ```

### Running the Application

Start the development server:

```sh
npm run dev
```

This will run the app in development mode. Open [http://localhost:5173](http://localhost:5173) (or another port if 5173 is busy) to view it in your browser.

## 🗺️ Development Roadmap

Our development plan is structured for rapid delivery and iteration.

### Week 1: MVP Build Sprint
-   Research and spec out APIs (MCP SDK, GPT-5, DeepSeek V3.1).
-   Set up the backend (Prisma with MongoDB/Postgres) and MCP monitor service.
-   Integrate AI models for analysis.
-   Build the Next.js frontend dashboard with attack replay and summary generation.
-   Deploy a public honeypot to capture initial data.

### Week 2: Beta Feedback & Expansion
-   Incorporate user feedback, focusing on UX and reducing false positives.
-   Enhance dashboard filtering and real-time notifications.
-   Refine logging schema and improve documentation for one-click deploys.

### Future Sprints
-   Implement automated mitigation features (e.g., auto-blocking).
-   Expand support for more model families.
-   Partner with AI security communities for broader rollout.

## 📈 Success Metrics

We measure success by:
-   Number of unique attack vectors detected.
-   Number of MCP servers monitored.
-   Public engagement (shared exploits, demo requests).
-   User feedback scores on usability and accuracy.
-   GitHub stars and demo clones.

## 🎯 Go-To-Market Strategy

Our strategy is to position MCP Security Guardian as the simplest way for developers to secure their AI workflows. We will target solo developers and AI startups with a "plug-and-play" solution, launching with a public honeypot to generate social proof and community engagement.
