const toggleModal = (modalId) => {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    const modalCloseBtn = modal.querySelector('.close');

    modal.classList.toggle('active');

    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    modalCloseBtn.addEventListener('click', () => {
        modal.classList.remove('active')
    })

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            e.stopPropagation();
            modal.classList.remove('active')

        }
    })
}

const settingsModalBtn = document.querySelector('.settings-modal');
const addColumnModal = document.querySelector('.add-column-btn');

addColumnModal.addEventListener('click', (e) => {
    toggleModal(e.currentTarget.dataset.modalId)

})

settingsModalBtn.addEventListener('click', e => toggleModal(e.currentTarget.classList))
