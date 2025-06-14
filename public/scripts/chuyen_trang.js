function navigateTo(url) {
    history.pushState({}, '', url);
    loadPage(url);
}

function loadPage(url) {
    let page = url === '/' ? 'home' : url.slice(1);
    fetch(`/partial/${page}`)
        .then(res => res.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(() => {
            document.getElementById('main-content').innerHTML = '<h2>404 - Not found</h2>';
        });
}

document.addEventListener('DOMContentLoaded', () => {
    // Link click handler
    document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            navigateTo(link.getAttribute('href'));
        });
    });

    // Load đúng trang khi user reload
    loadPage(location.pathname);
});

window.onpopstate = () => {
    loadPage(location.pathname);
};


function changeURL(url) {
    window.location.pathname = url;
}