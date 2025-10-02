//Adding Column Template
import { state, subscribe, addColumn, removeColumn, editColumn, clearState, exportBoard, importBoard, addCard, removeCard, editCard, sortColumn } from './state.js';


const columnTemplate = document.querySelector('#column-template')
const cardTemplate = document.querySelector('#card-template');
const board = document.querySelector('.columns-wrapper');


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

            const cloneEditCardBtn = cardClone.querySelector('.edit-card');
            cloneEditCardBtn.dataset.id = task.id;
            cloneEditCardBtn.dataset.title = task.title;
            cloneEditCardBtn.dataset.description = task.description;
            cloneEditCardBtn.dataset.priority = task.priority;
            cloneEditCardBtn.dataset.dueDate = task.dueDate;

            cardEl.dataset.id = task.id;
            cardClone.querySelector('.card-title').setAttribute('contenteditable', true); //inline edit
            cardClone.querySelector('.card-description').setAttribute('contenteditable', true)
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

const removeCardItem = () => {
    board.addEventListener('click', (e) => {
        if (e.target.matches('.remove-card')) {
            const colId = e.target.closest('.column').dataset.id;
            const cardId = e.target.closest('.card-item').dataset.id
            console.log(colId);

            removeCard(colId, cardId);
        }
    })
}

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

const openEditCardModal = () => {
    board.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-card');
        if (!editBtn) return;

        const columnId = e.target.closest('.column').dataset.id;
        const modal = document.getElementById(editBtn.dataset.modalId);

        // add values to modal
        modal.querySelector('#cardName').value = editBtn.dataset.title;
        modal.querySelector('#cardDescription').value = editBtn.dataset.description;
        modal.querySelector('#cardPriority').value = editBtn.dataset.priority;
        modal.querySelector('#cardDueDate').value = editBtn.dataset.dueDate;

        // dataset mode and columnID
        modal.dataset.mode = 'edit';
        modal.dataset.currentId = editBtn.dataset.id;
        modal.dataset.columnId = columnId;

        modal.querySelector('.add').textContent = 'Save';

        toggleModal(editBtn.dataset.modalId);
    });
};


const openAddCardModals = () => {
    board.addEventListener('click', (e) => {
        const addCardBtn = e.target.closest('.add-card-btn');
        if (!addCardBtn) return;

        const modal = document.getElementById(addCardBtn.dataset.modalId);


        modal.dataset.columnId = addCardBtn.dataset.id;

        // Reset inputs
        modal.querySelector('#cardName').value = '';
        modal.querySelector('#cardDescription').value = '';
        modal.querySelector('#cardPriority').value = 'medium';
        modal.querySelector('#cardDueDate').value = '';

        const saveBtn = modal.querySelector('.add');
        saveBtn.textContent = 'Add Card';

        modal.dataset.mode = 'Add';
        modal.dataset.currentId = '';

        toggleModal(addCardBtn.dataset.modalId);
    });
};

const addOrUpdateCard = () => {
    const modal = document.getElementById('column-add-card');
    const saveBtn = modal.querySelector('.add');

    saveBtn.addEventListener('click', () => {
        const title = modal.querySelector('#cardName').value.trim();
        const description = modal.querySelector('#cardDescription').value.trim();
        const priority = modal.querySelector('#cardPriority').value;
        const dueDate = modal.querySelector('#cardDueDate').value;
        const columnId = modal.dataset.columnId;

        if (!title) return;

        if (modal.dataset.mode === 'Add') {
            addCard(columnId, title, description, priority, dueDate);
        } else if (modal.dataset.mode === 'edit') {
            editCard(columnId, modal.dataset.currentId, { title, description, priority, dueDate });
        }

        // Reset modal
        modal.dataset.mode = '';
        modal.dataset.currentId = '';
        modal.dataset.columnId = '';
        modal.querySelector('#cardName').value = '';
        modal.querySelector('#cardDescription').value = '';
        modal.querySelector('#cardPriority').value = 'medium';
        modal.querySelector('#cardDueDate').value = '';
        saveBtn.textContent = 'Add Card';
        modal.classList.remove('active');
    });
};


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

const inlineEditCard = () => {
    board.addEventListener('blur', (e) => {
        const editable = e.target.closest('[contenteditable="true"]');
        if (!editable) return;

        const card = editable.closest('.card-item');
        const cardId = card.dataset.id;
        const columnId = card.closest('.column').dataset.id;

        const newData = {
            title: card.querySelector('.card-title')?.textContent,
            description: card.querySelector('.card-description')?.textContent
        };

        editCard(columnId, cardId, newData);
    }, true);

    board.addEventListener('keydown', (e) => {
        const editable = e.target.closest('[contenteditable="true"]');
        if (!editable) return;

        if (e.key === "Enter") {
            e.preventDefault(); // dont go to new line
            editable.blur();
        }
    });

}

const filterCardsByColumn = () => {
    board.addEventListener('click', (e) => {
        const sortBtn = e.target.closest('.sort-option');
        if (!sortBtn) return;

        const column = sortBtn.closest('.column');
        const colId = column.dataset.id;

        const sort = sortBtn.dataset.sort;
        const direction = sortBtn.dataset.direction;

        console.log('Sortiram kolonu:', colId, sort, direction);
        sortColumn(colId, sort, direction);

    });
}

resetBoard();

openModal();
openAddCardModals();
openEditCardModal();

addOrUpdateCard();
inlineEditCard();

addNewColumn();
updateColumn();

filterCardsByColumn();

exportJSON();
importJSON();

removeCardItem();

subscribe(renderBoard);
renderBoard(state);









