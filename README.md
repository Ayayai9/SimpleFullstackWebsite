# SimpleFullstackWebsite

A simple fullstack web application featuring a React/Next.js frontend and an Express.js backend with TypeORM for database management.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Monorepo Structure](#monorepo-structure)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

---

## Project Overview

**SimpleFullstackWebsite** is a template for a modern fullstack web application. The frontend is built with React using the Next.js framework, while the backend uses Express.js and TypeORM to provide a robust API and database integration.

## Features

- ⚡ Fullstack monorepo with both frontend and backend
- 🎨 Frontend built using React, Next.js, Tailwind CSS
- ⚙️ Backend powered by Express.js and TypeORM (with MySQL)
- 🔒 TypeScript support throughout the stack
- 🧪 Testing setup for frontend (Jest, Testing Library)
- 📦 Easy local development with scripts

## Tech Stack

- **Frontend**
  - Next.js
  - React
  - Tailwind CSS
  - Axios
  - Jest & Testing Library (for testing)
  - TypeScript

- **Backend**
  - Express.js
  - TypeORM
  - MySQL
  - TypeScript
  - Nodemon (for development)

## Monorepo Structure

```
SimpleFullstackWebsite/
├── frontend/               # Next.js (React) frontend
│   └── package.json
├── node-express-typeorm/   # Express.js + TypeORM backend
│   └── package.json
└── ...
```

## Setup Instructions

### Prerequisites

- Node.js (>= 18.x recommended)
- npm or yarn
- MySQL database (for backend)

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

   The frontend should now be running on [http://localhost:3000](http://localhost:3000).

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd node-express-typeorm
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure your database:

    - Copy or create an `.env` file (if needed) and update your MySQL database credentials.

4. Build and start the backend server:

    ```bash
    # For development (with auto-reload)
    npm run dev

    # For production build
    npm run build
    npm start
    ```

   The backend will start on the configured port (default is likely [http://localhost:3001](http://localhost:3001) or similar).

## Usage

- With both frontend and backend running, you can use the web application via your browser.
- The frontend communicates with the backend API for data operations.

## Development

- **Testing (Frontend):**

    ```bash
    npm run test
    # or
    yarn test
    ```

- **Linting (Frontend):**

    ```bash
    npm run lint
    # or
    yarn lint
    ```

- **Backend:** Modify and extend the Express API and database models in `/node-express-typeorm/src`.
