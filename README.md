# Typing Game

## Overview

This Typing Game App is a web-based application built with [Next.js](https://nextjs.org/). It is inspired by the popular [MonkeyType](https://monkeytype.com/) app, designed to improve typing speed and accuracy through interactive and engaging challenges. The app is containerized using Docker to simplify deployment and ensure compatibility.

## Features

- **Typing Challenges**: Timed typing tests to evaluate and improve speed and accuracy.
- **User-Friendly UI**: Intuitive and clean interface using TailwindCSS.
- **Responsive Design**: Fully functional across devices, from desktops to mobile.
- **Dockerized Deployment**: Easy-to-setup containerized environment.
<!-- - **Statistics Dashboard**: Track your progress over time with detailed stats. -->
<!-- - **Real-Time Feedback**: Live visual feedback on typing performance. -->

---

## Project Structure
Below is the directory structure of the project along with a brief description of each directory and file.

```
.
├── README.md                # Project documentation
├── app/                      
├── components/               # This directory contains reusable React components used throughout the project.
├── constants/                # Game-related constants
├── hooks/                    # Custom React hooks used throughout the project.
├── public/
├── docker-compose.yaml      # Docker Compose configuration
├── Dockerfile               # Docker image configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # TailwindCSS configuration
└── tsconfig.json            # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker (v20.10+)
- npm (v8+)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/frgonzal/typing
   cd typing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` in your browser.

---

## Dockerized Deployment

### Build and Run

1. Build the Docker image:
   ```bash
   docker-compose build
   ```

2. Start the container:
   ```bash
   docker-compose up
   ```
   The app will be available at `http://localhost:3000`.

---

## Environment Variables

- `NODE_ENV`: Set to `production` in Docker for optimized builds.

---

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm start`: Start the production server.

---

## Contribution

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- Inspired by [MonkeyType](https://monkeytype.com/)
- Built with [Next.js](https://nextjs.org/) and [TailwindCSS](https://tailwindcss.com/).
- Uses [Random Word API](https://random-word-api.vercel.app/api?) for generating words.