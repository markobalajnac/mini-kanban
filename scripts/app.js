//Adding Column Template

const addColumnInput = document.querySelector('#columnName');
const addColumntBtn = document.querySelector('#column-add-modal .add');
const columnTemplate = document.querySelector('#column-template')
const board = document.querySelector('.columns-wrapper');

console.log(addColumnInput);
console.log(addColumntBtn);

addColumntBtn.addEventListener('click', () => {
    const columnName = addColumnInput.value;
    console.log(columnName);

    if (columnName) {
        const clone = columnTemplate.content.cloneNode(true);
        clone.querySelector('.title').textContent = columnName;
        board.appendChild(clone);
    } else {
        alert('Enter column title!')
    }

})





