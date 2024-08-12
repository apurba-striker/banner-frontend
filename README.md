# Banner Frontend and Backend

This repository contains a full-stack application with two main parts: a backend and a frontend. The backend is implemented with Express and MySQL, while the frontend is built using React. The application features a dynamic banner with media content and an analytics page to track interactions.

## Table of Contents

- [Banner Frontend and Backend](#banner-frontend-and-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Frontend](#frontend)
    - [Installation](#installation)

## Features

1. **Immediate Update Reflection**: When the banner details are updated, the changes are reflected immediately on the banner without needing to refresh the page.
2. **Media Types**: Supports displaying different media types, including images and videos, with dynamic background views.
3. **Analytics Page**: Tracks and displays the number of times the banner has been clicked.

## Frontend

The frontend is built using React and includes the following features:

- **Banner Component**: Displays a dynamic banner with support for media (images and videos) and a countdown timer.
- **Dashboard Component**: Allows users to update banner details, including text, media, timer settings, and link. The updates are reflected immediately on the banner.
- **Analytics Page**: Shows the number of times the banner has been clicked.

### Installation

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
```
2 Install
```bash
npm install
```
3 Create a .env file in the frontend directory with the following content:
```
REACT_APP_API_BASE_URL=http://localhost:5000
```
Adjust the URL if your backend is deployed elsewhere.

Start the React development server:
    ```
    npm start
```
Backend
The backend is implemented with Express and MySQL. It provides APIs to fetch and update banner details, and track banner clicks.

Installation
Navigate to the backend directory:
```
cd backend
```
Install dependencies:
```
npm install
```
```
npm start

```
API Endpoints
GET /api/banner: Fetches the current banner details.
POST /api/banner: Updates the banner details.
POST /api/banner/click: Increments the click count for the banner.
GET /api/banner/clicks: Retrieves the total number of banner clicks.