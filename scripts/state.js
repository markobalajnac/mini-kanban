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
