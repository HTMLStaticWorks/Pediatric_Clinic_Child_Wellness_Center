// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('ls_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcons(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ls_theme', newTheme);
    updateThemeToggleIcons(newTheme);
    toast(newTheme === 'dark' ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
}

function updateThemeToggleIcons(theme) {
    const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
        const iconSpan = btn.querySelector('.nav-icon');
        if (iconSpan) {
            iconSpan.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
        } else {
            btn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
        }
        btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
}

// RTL Direction Management
function initRTL() {
    const savedDir = localStorage.getItem('ls_direction') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateRTLToggleButtons(savedDir);
}

function toggleRTL() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('ls_direction', newDir);
    updateRTLToggleButtons(newDir);
    toast(newDir === 'rtl' ? '🌐 Switched to Right-to-Left (RTL)' : '🌐 Switched to Left-to-Right (LTR)');
}

function updateRTLToggleButtons(dir) {
    document.querySelectorAll('[data-rtl-btn]').forEach(btn => {
        const textSpan = btn.querySelector('.nav-text') || btn.querySelector('.rtl-btn-text');
        const displayText = dir === 'rtl' ? 'LTR' : 'RTL';
        const titleText = dir === 'rtl' ? 'Switch layout to Left-to-Right (LTR)' : 'Switch layout to Right-to-Left (RTL)';
        
        if (textSpan) {
            textSpan.textContent = displayText;
        } else {
            btn.textContent = displayText;
        }
        btn.setAttribute('title', titleText);
        btn.setAttribute('aria-label', titleText);
    });
}

// Back to Top Button
function initBackToTop() {
    let btn = document.getElementById('backToTop');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'backToTop';
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Back to top');
        btn.setAttribute('data-action', 'scrollTop');
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
        document.body.appendChild(btn);
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
}

// Global Click Handlers
document.addEventListener('click', e => {
    const m = e.target.closest('[data-menu]');
    if (m) { document.getElementById('mobileNav')?.classList.toggle('open'); return }

    const dashMenuBtn = e.target.closest('[data-dash-menu]');
    if (dashMenuBtn) { document.querySelector('.mobile-dash-menu')?.classList.toggle('open'); return }

    const themeBtn = e.target.closest('[data-theme-btn]');
    if (themeBtn) { toggleTheme(); return; }

    const rtlBtn = e.target.closest('[data-rtl-btn]');
    if (rtlBtn) { toggleRTL(); return; }

    const scrollTopBtn = e.target.closest('[data-action="scrollTop"]');
    if (scrollTopBtn) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const close = e.target.closest('[data-close-modal]');
    if (close) { document.getElementById('modalRoot').innerHTML = ''; return }

    const faq = e.target.closest('.faq-q');
    if (faq) { faq.closest('.faq-item')?.classList.toggle('open'); return }

    const passToggle = e.target.closest('.password-toggle');
    if (passToggle) {
        const wrap = passToggle.closest('.password-wrap');
        const input = wrap ? wrap.querySelector('input') : null;
        if (input) {
            const isPass = input.type === 'password';
            input.type = isPass ? 'text' : 'password';
            passToggle.textContent = isPass ? '🙈' : '👁️';
        }
        return;
    }

    const forgot = e.target.closest('[data-action="forgotPass"]');
    if (forgot) {
        e.preventDefault();
        toast('Password reset link sent to your email (demo mode).');
        return;
    }
});

function toast(message) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = message; el.classList.add('show');
    clearTimeout(window.__toastTimer); window.__toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initBackToTop();
});
initTheme();
initRTL();

