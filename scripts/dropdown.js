const containers = document.querySelectorAll('.f-dropdown');

containers.forEach((container) => {
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.dropbtn');

        // if you click on the drop button
        if (btn) {
            const dropdown = btn.nextElementSibling;

            // close all of them except the open one
            document.querySelectorAll('.dropdown-content').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');

                    const otherBtn = d.previousElementSibling;
                    if (otherBtn && otherBtn.classList.contains('dropbtn')) {
                        otherBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            const isOpen = dropdown.classList.toggle('active');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

            return;
        }

        // outside dropdowns
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
})


