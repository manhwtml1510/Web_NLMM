document.addEventListener('DOMContentLoaded', function() {
    // Load trang chủ mặc định khi trang được tải
    loadPage('trangchu');

    // Thêm sự kiện click cho các nút menu
    const menuLinks = document.querySelectorAll('.menu-chinh a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });
});

document.addEventListener("click", function (e) {
    const target = e.target.closest("[data-page]");
    if (target) {
        e.preventDefault(); // Chặn chuyển trang mặc định
        const page = target.getAttribute("data-page");
        loadPage(page); // Gọi hàm loadPage với tên trang
    }
});

function loadPage(page) {
    const mainContent = document.getElementById('main-content');

    // Tạo đường dẫn đến file HTML tương ứng
    const pagePath = `pages/${page}.html`;

    // Sử dụng Fetch API để tải nội dung
    fetch(pagePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải trang');
            }
            return response.text();
        })
        .then(html => {
            mainContent.innerHTML = html;
            // Có thể thêm logic để xử lý sau khi tải trang ở đây
        })
        .catch(error => {
            console.error('Lỗi:', error);
            mainContent.innerHTML = '<p>Không thể tải trang. Vui lòng thử lại sau.</p>';
        });
}