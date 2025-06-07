
let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)
let allProducts = []


function renderListProduct(productList) {
    const productHtmls = productList.map((product) => {
        return `
        <div class="product-cart">
            <div class="cart-image">
                <a href="#">
                    <img src="${product.image}" alt="">
                </a>
            </div>
            <div class="cart-body">
                <h3 class="cart-brand">${product.thuonghieu}</h3>
                <h3 class="cart-name">${product.ten}</h3>
                <h4 class="cart-volume">Full ${product.dungtich}</h4>
                <h4 class="cart-depict">${product.phongcach}</h4>
                <div class="cart-footer">
                    <p class="cart-price">${Number(product.gia).toLocaleString('vi-VN')} vnđ</p>
                    <button class="cart-button" data-product='${JSON.stringify(product)}'>
                        <img class="icon" src="styles/images/shopping-bag.png" alt="shopping-cart">
                    </button>
                </div>
            </div>
        </div>
        `
    })

    document.querySelector("#listProduct").innerHTML = productHtmls.join("")

    // sử lý thêm giỏ hàng
    document.querySelectorAll(".cart-button").forEach(button => {
        button.addEventListener("click", () => {
            const product = JSON.parse(button.getAttribute("data-product"))
            const cart = JSON.parse(localStorage.getItem("cart")) || []

            cart.push(product)
            localStorage.setItem("cart", JSON.stringify(cart))
        })
    })    
}


function loadPage(page) {
    const mainContent = document.getElementById('main-content')
    const pagePath = `pages/${page}.html`

    fetch(pagePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải trang')
            }
            return response.text()
        })
        .then(html => {
            mainContent.innerHTML = html

            if (page === 'bosuutap') {
                fetch('data.json')
                    .then(response => response.json())
                    .then(data => {
                        allProducts = data
                        renderListProduct(allProducts)
                        setupFilterButtons()

                        const searchInput = document.getElementById('searchInput')
                        if (searchInput) {
                            searchInput.addEventListener('input', function () {
                                const keyword = this.value.toLowerCase().trim()
                                const filtered = allProducts.filter(product =>
                                    product.ten.toLowerCase().includes(keyword) ||
                                    product.thuonghieu.toLowerCase().includes(keyword)
                                )
                                renderListProduct(filtered)
                            })
                        }
                    })
                    .catch(error => {
                        console.error("Lỗi khi tải dữ liệu:", error)
                    })
            }
        })
        .catch(error => {
            console.error('Lỗi:', error)
            mainContent.innerHTML = '<p>Không thể tải trang. Vui lòng thử lại sau.</p>'
        });
}


function setupFilterButtons() {
    $$('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            const gender = button.dataset.gender

            $$('.filter-button').forEach(btn => btn.classList.remove('active'))
            button.classList.add('active')

            const filtered = allProducts.filter(p => p.gioitinh === gender)
            renderListProduct(filtered)
        })
    })
}

loadPage()


// Lấy tất cả nút có class "cart-button"
document.querySelectorAll(".cart-button").forEach(button => {
    button.addEventListener("click", () => {
        // Lấy thông tin sản phẩm từ thuộc tính data-product
        const product = JSON.parse(button.getAttribute("data-product"));

        // Lấy giỏ hàng hiện có từ localStorage (nếu chưa có thì dùng mảng rỗng)
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Thêm sản phẩm vào giỏ hàng
        cart.push(product);

        // Lưu lại vào localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

    });
});
