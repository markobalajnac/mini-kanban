//Adding Column Template
import { state, subscribe, addColumn, removeColumn, editColumn, clearState, exportBoard, importBoard, addCard } from './state.js';


const columnTemplate = document.querySelector('#column-template')
const cardTemplate = document.querySelector('#card-template');
const board = document.querySelector('.columns-wrapper');
const addCardModal = document.querySelector('#column-add-card')




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

const addNewCard = () => {
    const saveCardBtn = document.querySelector('#column-add-card .add');
    const cardDescInput = document.querySelector('#cardDescription');
    const cardTitleInput = document.querySelector('#cardName');
    const cardPriorityInput = document.querySelector('#cardPriority');
    const cardDueInput = document.querySelector('#cardDueDate');

    saveCardBtn.addEventListener('click', () => {
        const title = cardTitleInput.value.trim();
        const description = cardDescInput.value.trim();
        const priority = cardPriorityInput.value;
        const dueDate = cardDueInput.value;
        const currentColumnId = addCardModal.dataset.id;

        if (!title) return; // obavezno polje

        addCard(currentColumnId, title, description, priority, dueDate);

        addCardModal.classList.remove('active'); // zatvori modal
        cardTitleInput.value = '';
        cardDescInput.value = '';
        cardPriorityInput.value = 'low';
        cardDueInput.value = '';

    })

}

const renderBoard = (state) => {
    board.innerHTML = '';
    state.columns.forEach(column => {
        const clone = columnTemplate.content.cloneNode(true);
        const cloneItem = clone.querySelector('.column');
        const cloneEditBtn = clone.querySelector('.edit-col-btn');
        const addCardBtn = clone.querySelector('.add-card-btn');
        addCardBtn.dataset.id = column.id;
        cloneEditBtn.dataset.id = column.id;
        cloneEditBtn.dataset.title = column.title;
        cloneItem.dataset.id = column.id;
        cloneItem.querySelector('.title').textContent = column.title;

        const cardsContainer = cloneItem.querySelector('.column-body');

        // ovde renderujemo sve taskove iz state-a
        column.tasks.forEach(task => {
            const cardClone = cardTemplate.content.cloneNode(true);
            const cardEl = cardClone.querySelector('.card-item');

            cardEl.dataset.id = task.id;
            cardClone.querySelector('.card-title').textContent = task.title;
            cardClone.querySelector('.card-description').textContent = task.description;
            cardClone.querySelector('.card-priority').dataset.priority = `${task.priority}`;
            cardClone.querySelector('.card-due-date').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
    <path fill="currentColor" d="M6 4V1.5h2V4h8V1.5h2V4h4v18H2V4h4ZM4 6v3h16V6H4Zm16 5H4v9h16v-9Z"/>
</svg> ${task.dueDate}`;

            cardsContainer.appendChild(cardClone);
        });

        board.appendChild(clone);
    });
    updatePlaceholders();
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
        if (!editBtn) return;

        const modalId = editBtn.dataset.modalId;
        const id = editBtn.dataset.id;
        const title = editBtn.dataset.title;


        const modal = document.getElementById(modalId);
        const input = modal.querySelector('input');
        const addBtn = modal.querySelector('.add');

        input.value = title;
        addBtn.textContent = 'Save';
        modal.dataset.mode = 'edit';
        modal.dataset.currentId = id;

        toggleModal(modalId);
    });
}

const openAddCardModals = () => {
    board.addEventListener('click', (e) => {
        const addCardBtn = e.target.closest('.add-card-btn');
        if (!addCardBtn) return; // stop 

        addCardModal.dataset.id = addCardBtn.dataset.id; // get id from column
        const modalId = addCardBtn.dataset.modalId;

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
            importBoard(e.target.files[0]);
            e.target.value = '';
        }
    });
}

function updatePlaceholders() {
    const columns = document.querySelectorAll('.column');

    columns.forEach(col => {
        const tasks = col.querySelectorAll('.card-item');
        const placeholder = col.querySelector('.placeholder');

        if (tasks.length === 0) {
            placeholder.classList.add('show');
        } else {
            placeholder.classList.remove('show');
        }
    });
}

resetBoard();
openModal();
openAddCardModals();
addNewColumn();
updateColumn();

exportJSON();
importJSON();

addNewCard();

subscribe(renderBoard);
renderBoard(state);









