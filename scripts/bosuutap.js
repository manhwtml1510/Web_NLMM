

let $ = document.querySelector.bind(document)
let productLocal = JSON.parse(localStorage.getItem('products')) || []
console.log(productLocal)
function renderListProduct() {
    const productHtmls = productLocal.map((product) => {
        return`
        <div class="product-cart">
            <div class="cart-image">
                <a href="#">
                    <img 
                        src="${product.image}"  
                        alt=""
                >
                </a>
            </div>

            <div class="cart-body">
                <h3 class="cart-brand">${product.thuonghieu}</h3>
                <h3 class="cart-name">${product.ten}</h3>
                <h4 class="cart-volume">Full ${product.dungtich}</h4>
                <h4 class="cart-depict">${product.phongcach}</h4>
                <p class="cart-price">${product.gia} vnđ</p>
            </div>
        </div>
        `
    })
    
    const productHtml = productHtmls.join("")

    // console.log(productHtml)

    $("#listProduct").innerHTML = productHtml

    
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
                renderListProduct()
            }
        })
        .catch(error => {
            console.error('Lỗi:', error)
            mainContent.innerHTML = '<p>Không thể tải trang. Vui lòng thử lại sau.</p>'
        });
}

loadPage()
