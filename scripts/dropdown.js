document.addEventListener('click', (e) => {
    const btn = e.target.closest('.dropbtn');

    if (btn) {
        const dropdown = btn.nextElementSibling;

        // close all dropdowns except the open one
        document.querySelectorAll('.dropdown-content').forEach(d => {
            if (d !== dropdown) {
                d.classList.remove('active');
                const otherBtn = d.previousElementSibling;
                if (otherBtn && otherBtn.classList.contains('dropbtn')) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // open/close dropdown
        const isOpen = dropdown.classList.toggle('active');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        return;
    }

    // click outside dropdowns
    if (!e.target.closest('.dropdown-content')) {
        document.querySelectorAll('.dropdown-content').forEach(d => {
            d.classList.remove('active');
            const otherBtn = d.previousElementSibling;
            if (otherBtn && otherBtn.classList.contains('dropbtn')) {
                otherBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});