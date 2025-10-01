const toggleModal = (modalId) => {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    const modalCloseBtn = modal.querySelector('.close');

    modal.classList.toggle('active');

    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target.matches('.close') || e.target.matches('.cancel')) {
            modal.classList.remove('active')
        }
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            e.stopPropagation();
            modal.classList.remove('active')

        }
    })
}

const settingsModalBtn = document.querySelector('.settings-modal');
const addColumnModal = document.querySelector('.add-column-btn');
const addCardModalBtns = document.querySelectorAll('.add-card-btn');

const columnsWrapper = document.querySelector('.columns-wrapper');


addColumnModal.addEventListener('click', (e) => {

    const modal = document.getElementById(e.currentTarget.dataset.modalId);
    const input = modal.querySelector('input');
    const addBtn = modal.querySelector('.add');

    input.value = '';
    addBtn.textContent = 'Add Column';
    modal.dataset.mode = 'add';
    modal.dataset.currentId = '';

    toggleModal(modal.id);

})

settingsModalBtn.addEventListener('click', e => toggleModal(e.currentTarget.classList))


