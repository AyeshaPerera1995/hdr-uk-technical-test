# HDR UK – Junior Full Stack Software Engineer Technical Test

## Project Overview

This project is a full-stack web application built as part of the HDR UK technical assessment.
It retrieves dataset metadata from a provided JSON source, extracts specific fields, and displays them in a modern, user-friendly table interface.

---

## Features

- Fetches dataset metadata from external JSON source
- Backend API built with Node.js and Express
- Frontend built with React and TypeScript
- Displays datasets in a clean, modern table UI
- Search functionality (filter by title)
- Pagination for better data navigation
- Truncated descriptions with “Read More” modal
- Loading indicator while fetching data
- “No results found” state handling
- External access links for each dataset

---

## Tech Stack

### Frontend

- React
- TypeScript
- CSS (custom styling)

### Backend

- Node.js
- Express

---

## Data Source

Dataset metadata is retrieved from:
https://raw.githubusercontent.com/HDRUK/hackathon-entity-linkage/refs/heads/dev/fe-implement/app/data/all_datasets.json

---

## Extracted Fields

The application extracts and displays the following fields:

- `title` → metadata.summary.title
- `description` → metadata.summary.description
- `accessServiceCategory` → metadata.accessibility.access.accessServiceCategory
- `accessRights` → metadata.accessibility.access.accessRights

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/AyeshaPerera1995/hdr-uk-technical-test.git
cd hdr-uk-technical-test
```

---

### 2. Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Endpoint

The backend exposes:

```
GET /datasets
```

Returns a filtered list of datasets in JSON format.

---

## Design Decisions

- Used a table layout for clear comparison of datasets
- Added pagination for performance and usability
- Used modal for long descriptions to maintain clean UI
- Implemented search for quick dataset filtering
- Applied modern styling for better user experience

---

## Author

Ayesha Perera
