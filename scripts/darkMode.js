const switchToggle = document.querySelector("#theme-toggle");
const body = document.querySelector('body');

switchToggle.addEventListener('change', () => {
    body.classList.toggle('dark')
    localStorage.setItem('darkMode', switchToggle.checked)

})

if (localStorage.getItem('darkMode') === "true") {
    body.classList.add('dark')
    switchToggle.checked = true
}


