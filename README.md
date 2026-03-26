# NC News API

A RESTful API powering a news aggregation platform where users can browse articles, post comments, vote on content, and explore topics by category.

🌐 **Live API:** [https://nc-news-yyic.onrender.com/](https://nc-news-yyic.onrender.com/)

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)

---

## Overview

NC News is a backend API built with Node.js, Express, and PostgreSQL. It exposes a set of endpoints that allow clients to interact with a news database — retrieving articles, filtering by topic, reading and posting comments, and casting votes.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/nc-news.git
cd nc-news
```

2. **Install dependencies**

```bash
npm install
```

### Environment Setup

This project requires two `.env` files in the root directory to connect to the correct database depending on the environment.

**`.env.test`**
```
PGDATABASE=nc_news_test
```

**`.env.development`**
```
PGDATABASE=nc_news
```

> ⚠️ Both files are listed in `.gitignore` and must be created manually — they are not included in the repository.

### Database Setup

Run the following commands to create and seed the databases:

```bash
# Create the databases
npm run setup-dbs

# Seed with development data
npm run seed
```

### Running the Server

```bash
npm start
```

The server will start on `http://localhost:9000` by default.

---

## Running Tests

```bash
npm test
```

Tests use the `nc_news_test` database, which is automatically seeded before each test suite runs.

---

For full request/response details, visit the live [`/api`](https://nc-news-yyic.onrender.com/api) endpoint.
