//Adding Column Template
import { state, subscribe, addColumn } from './state.js';

const addColumnInput = document.querySelector('#columnName');
const addColumntBtn = document.querySelector('#column-add-modal .add');
const columnTemplate = document.querySelector('#column-template')
const board = document.querySelector('.columns-wrapper');

// console.log(addColumnInput);
// console.log(addColumntBtn);

addColumntBtn.addEventListener('click', () => {
    addColumn(addColumnInput.value.trim())
})

const renderBoard = (state) => {
    board.innerHTML = '';
    state.columns.forEach(column => {
        const clone = columnTemplate.content.cloneNode(true);
        const cloneItem = clone.querySelector('.column');
        cloneItem.dataset.id = column.id;
        cloneItem.querySelector('.title').textContent = column.title;
        board.appendChild(clone);
    });
}


subscribe(renderBoard);
renderBoard(state);







