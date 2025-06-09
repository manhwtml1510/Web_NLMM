let $$$ = document.querySelector.bind(document)

function renderCart(cartList) {
    const cartHtmls = cartList.map(product => {
        return `
        <div class="item-cart" data-id="${product.ten}|${product.thuonghieu}">
            <div class="cart-image">
                <img src="${product.image}" alt="">
            </div>
            <div class="cart-name">${product.ten}</div>
            <div class="cart-price">${product.giaDon.toLocaleString()} vnd</div>
            <div class="cart-quantity">
                <button class="cart-subtration">-</button>
                <div class="quantity">${product.quantity}</div>
                <button class="cart-addition">+</button>
            </div>
            <div class="cart-remove">
                <img src="styles/images/remove.png" alt="remove">
            </div>
        </div>
        `
    })

    $$$("#listCartProduct").innerHTML = cartHtmls.join("")
    attachCartEvents()
}

function attachCartEvents() {
    document.querySelectorAll(".item-cart").forEach(item => {
        const dataId = item.dataset.id
        const [ten, thuonghieu] = dataId.split("|")
        const btnAdd = item.querySelector(".cart-addition")
        const btnSub = item.querySelector(".cart-subtration")
        const btnRemove = item.querySelector(".cart-remove")
        const quantityDiv = item.querySelector(".quantity")
        const priceDiv = item.querySelector(".cart-price")

        const updateUI = (product) => {
            quantityDiv.textContent = product.quantity
            priceDiv.textContent = `${(product.giaDon * product.quantity).toLocaleString()} vnd`
        }

        // Tăng
        btnAdd.addEventListener("click", () => {
            const product = cart.find(p => p.ten === ten && p.thuonghieu === thuonghieu)
            if (product) {
                product.quantity += 1
                updateUI(product)
                localStorage.setItem("cart", JSON.stringify(cart))
            }
        })

        // Giảm nhưng không dưới 1
        btnSub.addEventListener("click", () => {
            const product = cart.find(p => p.ten === ten && p.thuonghieu === thuonghieu)
            if (product && product.quantity > 1) {
                product.quantity -= 1
                updateUI(product)
                localStorage.setItem("cart", JSON.stringify(cart))
            }
        })

        // Xoá sản phẩm
        btnRemove.addEventListener("click", () => {
            cart = cart.filter(p => !(p.ten === ten && p.thuonghieu === thuonghieu))
            localStorage.setItem("cart", JSON.stringify(cart))
            renderCart(cart)
        })
    })
}
loadPage('giohang')
