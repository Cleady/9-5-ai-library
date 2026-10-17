
function initPasswordToggle() {
    const containers = document.querySelectorAll('.input-container');
    containers.forEach(container => {
        const input = container.querySelector('input');
        if (!input || (input.type !== 'password' && input.type !== 'text')) return;

        // Find the specific button that contains the SVG
        let eyeIcon = null;
        container.querySelectorAll('.btn-toggle-password').forEach(btn => {
            const svg = btn.querySelector('svg');
            if (svg) eyeIcon = svg;
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentType = input.getAttribute('type');
                if (currentType === 'password') {
                    input.setAttribute('type', 'text');
                    if (eyeIcon) eyeIcon.innerHTML = `
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                    `;
                } else {
                    input.setAttribute('type', 'password');
                    if (eyeIcon) eyeIcon.innerHTML = `
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    `;
                }
            });
        });
    });
}
document.addEventListener('DOMContentLoaded', initPasswordToggle);
