
let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)
let productLocal = JSON.parse(localStorage.getItem('products')) || []
let allProducts = []
console.log(productLocal)
function renderListProduct(productList) {
    const productHtmls = productList.map((product) => {
        return `
        <li class="product-cart" onclick="loadProducts(${product.id})">
            <div class="cart-image">
                <a href="#">
                    <img src=../images/products/${product.id}.png alt="">
                </a>
            </div>
            <div class="cart-body">
                <h3 class="cart-brand">${product.brand}</h3>
                <h3 class="cart-name">${product.name}</h3>
                <h4 class="cart-volume">Full ${product.capacity}</h4>
                <h4 class="cart-depict">${product.style}</h4>
                <p class="cart-price">${Number(product.price).toLocaleString('vi-VN')} vnđ</p>
            </div>
        </li>
        `
    })

    document.querySelector("#listProduct").innerHTML = productHtmls.join("")
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
                fetch('http://localhost:3001/api/products')
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
                                    product.name.toLowerCase().includes(keyword) ||
                                    product.brand.toLowerCase().includes(keyword)
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

            const filtered = allProducts.filter(p => p.gender === gender)
            renderListProduct(filtered)
        })
    })
}

loadPage()


// Xem chi tiết từng sản phẩm
let this_product
function loadProducts(id) {
    this_product = allProducts.find(product => product.id === id);
    document.getElementById('main-content').innerHTML = `

        <section class="title-bar">
            <h1 id="title">${this_product.name}</h1>
        </section>
        
        <section class="flex-box">
            <div class="box-image">
                <img src=../images/products/${this_product.id}.png alt="">
            </div>
            <div class="box-content">
                <br><br><br><br><br><br><br><br><br><br><br><br>
                <h2>Tên sản phẩm: ${this_product.name}</h2>
                <br><br>
                <h2>${this_product.price} VND</h2>
                <br><br>
                <h3>Xuất sứ: ${this_product.origin}</h3>
                <br><br>
                <h3>Dung tích: ${this_product.capacity} ml</h3>
                <br><br><br>
                <h3>Phong cách: ${this_product.style}</h3>
                <br><br>
                <button class="button">Mua ngay</button>
            </div>
        </section>

    `
}