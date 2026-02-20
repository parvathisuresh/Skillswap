function toggleSidebar() {
    document.getElementById("sidebar")
    .classList.toggle("-translate-x-full");
}

function navigateTo(category) {
    const pages = {
        'coding': 'coding.html',
        'cooking': 'cooking.html',
        'design': 'design.html',
        'language': 'language.html'
    };
    
    if (pages[category]) {
        window.location.href = pages[category];
    }
}