document.addEventListener('DOMContentLoaded', () => {
    // Check login
    if (!localStorage.getItem('sati_logged_in')) {
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(localStorage.getItem('sati_user') || '{"name":"Student","email":"student@sati.ac.in"}');

    // Inject Sidebar
    const body = document.body;
    const sidebarHTML = `
        <div id="sidebar-overlay" class="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden hidden"></div>
        <aside id="sidebar" class="fixed top-0 left-0 z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 -translate-x-full lg:translate-x-0">
            <div class="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border">
                <div class="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                    <i data-lucide="library" class="h-4 w-4 text-primary-foreground"></i>
                </div>
                <div>
                    <span class="font-bold text-sm text-foreground" style="display: block;">SATI Library</span>
                    <p class="text-[10px] text-muted-foreground" style="margin: 0;">AI-Powered</p>
                </div>
                <button id="close-sidebar" class="ml-auto lg:hidden text-muted-foreground bg-transparent border-none cursor-pointer">
                    <i data-lucide="x" class="h-5 w-5"></i>
                </button>
            </div>

            <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
                <a href="dashboard.html" class="nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" data-path="dashboard.html">
                    <i data-lucide="layout-dashboard" class="h-4 w-4 shrink-0"></i>
                    <span>Dashboard</span>
                </a>
                <a href="books.html" class="nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" data-path="books.html">
                    <i data-lucide="book-open" class="h-4 w-4 shrink-0"></i>
                    <span>Books</span>
                </a>
                <a href="search.html" class="nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" data-path="search.html">
                    <i data-lucide="search" class="h-4 w-4 shrink-0"></i>
                    <span>Search</span>
                </a>
                <a href="favorites.html" class="nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" data-path="favorites.html">
                    <i data-lucide="heart" class="h-4 w-4 shrink-0"></i>
                    <span>Favorites</span>
                </a>
                <a href="issued.html" class="nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" data-path="issued.html">
                    <i data-lucide="book-marked" class="h-4 w-4 shrink-0"></i>
                    <span>Issued Books</span>
                </a>
                <a href="settings.html" class="nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" data-path="settings.html">
                    <i data-lucide="settings" class="h-4 w-4 shrink-0"></i>
                    <span>Settings</span>
                </a>
            </nav>

            <div class="p-3 border-t border-sidebar-border">
                <div class="flex items-center gap-3 px-3 py-2 mb-2">
                    <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                        ${user.name?.[0]?.toUpperCase() || "S"}
                    </div>
                    <div class="min-w-0">
                        <p class="text-xs font-medium text-foreground truncate" style="margin: 0;">${user.name || "Student"}</p>
                        <p class="text-[10px] text-muted-foreground truncate" style="margin: 0;">${user.email}</p>
                    </div>
                </div>
                <button id="logout-btn" class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-destructive transition-colors bg-transparent border-none cursor-pointer">
                    <i data-lucide="log-out" class="h-4 w-4"></i>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    `;

    const mainWrapper = document.getElementById('main-wrapper');
    if (mainWrapper) {
        const sidebarContainer = document.createElement('div');
        sidebarContainer.innerHTML = sidebarHTML;
        body.insertBefore(sidebarContainer, mainWrapper);
    }

    // Header for mobile
    const headerHTML = `
        <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-md px-4 lg:hidden">
            <button id="open-sidebar" class="text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer">
                <i data-lucide="menu" class="h-5 w-5"></i>
            </button>
            <span class="font-bold text-sm text-foreground">SATI Library</span>
        </header>
    `;

    const mainElement = document.querySelector('main');
    if (mainElement) {
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = headerHTML;
        mainElement.parentElement.insertBefore(headerContainer, mainElement);
    }

    // Sidebar Logic
    const openSidebarBtn = document.getElementById('open-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebar = document.getElementById('sidebar');

    const toggleSidebar = (show) => {
        if (show) {
            sidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.remove('hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
        }
    };

    if (openSidebarBtn) openSidebarBtn.addEventListener('click', () => toggleSidebar(true));
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

    // Active Link
    const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-path') === currentPath) {
            item.classList.add('bg-sidebar-accent', 'text-primary', 'font-medium');
            item.classList.remove('text-muted-foreground');
        }
    });

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('sati_logged_in');
            localStorage.removeItem('sati_user');
            window.location.href = 'index.html';
        });
    }

    // Re-init icons
    if (window.lucide) lucide.createIcons();
});
