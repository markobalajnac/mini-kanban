const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.header-functions');

console.log(menuButton);

if (menu && menuButton) {
    menuButton.addEventListener('click', (e) => {
        menu.classList.toggle('active')
        e.stopPropagation();
    })

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
}
