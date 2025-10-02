// state.js
const STORAGE_KEY = 'kanbanState';

const initialState = {
    columns: [
        { id: 'todo', title: 'To Do', tasks: [] },
        { id: 'inprogress', title: 'In Progress', tasks: [] },
        { id: 'done', title: 'Done', tasks: [] }
    ]
};

export let state = loadState();



const listeners = []; // ui functions, subscribers

// --- helpers ---
function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : structuredClone(initialState);
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    notify();
}

if (!localStorage.getItem(STORAGE_KEY)) {
    // save default columns to localStorage
    saveState();
}

// --- subscribe and unsubscribe sistem ---
export function subscribe(fn) {
    listeners.push(fn);
    return () => {
        listeners.splice(listeners.indexOf(fn), 1);
    };
}

function notify() {
    listeners.forEach(fn => fn(state));
}

// --- API ---
export function addColumn(title) {
    const newColumn = {
        id: Date.now().toString(),
        title,
        tasks: []
    };
    state.columns.push(newColumn);
    saveState();
}

export function removeColumn(columnId) {
    state.columns = state.columns.filter(c => c.id !== columnId);
    saveState();
}

export function editColumn(columnId, newTitle) {
    const column = state.columns.find(c => c.id === columnId);
    if (!column) return;

    column.title = newTitle;
    saveState();
}

export function clearState() {
    state = structuredClone(initialState);

    saveState();
}

export function exportBoard() {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'kanban-board.json';
    a.click();

    URL.revokeObjectURL(url);
}

export function importBoard(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const importedState = JSON.parse(e.target.result);


            if (!importedState.columns || !Array.isArray(importedState.columns)) {
                throw new Error('Invalid file format');
            }

            state = importedState;
            saveState();
        } catch (err) {
            alert('Failed to import board: ' + err.message);
        }
    };

    reader.readAsText(file);
}

export function addCard(columnId, title, description, priority = "low", dueDate = null) {
    const column = state.columns.find(col => col.id === columnId);
    if (!column) return;

    const newCard = {
        id: "card-" + Date.now(),
        title,
        description,
        priority,           // low, medium, high
        dueDate,            // "2025-10-03" 
        createdAt: Date.now()
    };

    column.tasks.push(newCard);
    saveState();
    notify();
}

export function removeCard(columnId, cardId) {
    const column = state.columns.find(col => col.id === columnId);
    if (!column) return;

    column.tasks = column.tasks.filter(task => task.id !== cardId);

    saveState();
}

export function editCard(columnId, taskId, newData) {
    const column = state.columns.find(col => col.id === columnId);
    if (!column) return;

    const task = column.tasks.find(t => t.id === taskId);
    if (!task) return;

    // update polja
    task.title = newData.title ?? task.title;
    task.description = newData.description ?? task.description;
    task.priority = newData.priority ?? task.priority;
    task.dueDate = newData.dueDate ?? task.dueDate;

    saveState();
}


