//Adding Column Template
import { state, subscribe, addColumn, removeColumn, editColumn, clearState, exportBoard, importBoard } from './state.js';


const columnTemplate = document.querySelector('#column-template')
const board = document.querySelector('.columns-wrapper');

// console.log(addColumnInput);
// console.log(addColumntBtn);



const addNewColumn = () => {
    const modalAdd = document.getElementById('column-add-modal');
    const addColumnInput = document.querySelector('#columnName');
    const addColumntBtn = document.querySelector('#column-add-modal .add');

    addColumntBtn.addEventListener('click', () => {
        if (modalAdd.dataset.mode === 'add') {
            addColumn(addColumnInput.value.trim())
        }
    })
}

const renderBoard = (state) => {
    board.innerHTML = '';
    state.columns.forEach(column => {
        const clone = columnTemplate.content.cloneNode(true);
        const cloneItem = clone.querySelector('.column');
        const cloneEditBtn = clone.querySelector('.edit-col-btn');
        cloneEditBtn.dataset.id = column.id;
        cloneEditBtn.dataset.title = column.title;
        cloneItem.dataset.id = column.id;
        cloneItem.querySelector('.title').textContent = column.title;
        board.appendChild(clone);
    });
}


/* Remove Column */

board.addEventListener('click', (e) => {
    if (e.target.matches('.remove-col-btn')) {
        const col = e.target.closest('.column');
        const colId = col.dataset.id;
        removeColumn(colId);
    }

})

/* Edit Column */

const openModal = () => {
    board.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-col-btn');
        if (!editBtn) return; // ako nije klik na dugme za edit, izlazi

        const modalId = editBtn.dataset.modalId;
        const id = editBtn.dataset.id;
        const title = editBtn.dataset.title;

        // pripremi modal za edit
        const modal = document.getElementById(modalId);
        const input = modal.querySelector('input');
        const addBtn = modal.querySelector('.add');

        input.value = title;
        addBtn.textContent = 'Save';
        modal.dataset.mode = 'edit';       // <-- dodaj ovo
        modal.dataset.currentId = id;

        // otvori modal
        toggleModal(modalId);
    });
}

const updateColumn = () => {
    const modalAdd = document.getElementById('column-add-modal');
    const addBtn = modalAdd.querySelector('.add');
    const input = modalAdd.querySelector('input');

    addBtn.addEventListener('click', () => {
        const value = input.value.trim();
        if (!value) return;

        if (modalAdd.dataset.mode === 'edit') {
            editColumn(modalAdd.dataset.currentId, value);

        }
        // reset modal
        modalAdd.dataset.mode = '';
        modalAdd.dataset.currentId = '';
        input.value = '';
        addBtn.textContent = 'Add Column';
        modalAdd.classList.remove('active');
    });
}

const resetBoard = () => {
    const resetBtn = document.querySelector('#reset-board');
    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the board?')) {
            clearState();
        }
    })
}

const exportJSON = () => {
    const exportBtn = document.querySelector('#export-json');
    exportBtn.addEventListener('click', () => {
        if (confirm('Do you want to download a JSON file?')) {
            exportBoard();
        }
    })
}

const importJSON = () => {
    const importInput = document.querySelector('.import-data input');
    importInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            importBoard(e.target.files[0]);  // učitavamo izabrani fajl
            e.target.value = '';             // reset input za sledeći import
        }
    });
}

resetBoard();
openModal();
addNewColumn();
updateColumn();
exportJSON();
importJSON();



subscribe(renderBoard);
renderBoard(state);







