# Kanban Board (Vanilla JS SPA)

This is a simple **Kanban board application** built with pure JavaScript (no frameworks).  
The app behaves as a **Single Page Application (SPA)** – all updates happen without page reload, and data is persisted in **localStorage**.

## Features
- Three default columns: **To Do, In Progress, Done**
- Add, edit (inline & modal), and delete columns and cards
- Card details: title, description, priority, due date
- **Sorting and filtering** cards (by date and priority)
- **Search** across all columns
- **Drag & Drop** cards between columns (with visual preview)
- Light/Dark theme toggle (saved in localStorage)
- Responsive layout (scales from 1 to 4 columns)

## Architecture
- **state.js** – central state management, add/edit/delete/move functions, localStorage persistence  
- **app.js** – rendering logic and event handlers (sort, search, filter, drag&drop, inline edit)  
- **index.html / style.css** – semantic HTML and responsive, modern CSS design  

## How to Run
1.  (Node.js + live-server):
   ```bash
npm install -g live-server
cd path\to\project\mini-kanban-main```
2.  (Python):
   ```bash
cd path\to\project\mini-kanban-main
python -m http.server 5500
Open in browser http://localhost:5500```

