let $$$ = document.querySelector.bind(document)

let cartLogin = JSON.parse(localStorage.getItem("cart")) || []
console.log(cartLogin)

function renderCart(productCartList) {
    const productCartHtmls = productCartList.map((product) => {
        console.log(product)
        return`
        <div class="item-cart">
            <div class="cart-image">
                <img src="${product.image}"
                    alt="">
            </div>
            <div class="cart-name">${product.ten}</div>
            <div class="cart-price">${product.gia} vnd</div>
            <div class="cart-quantity">
                <button id="subtration" class="cart-subtration">-</button>
                <div>10</div>
                <button id="addition" class="cart-addition">+</button>
            </div>
            <div id="cart-remove" class="cart-remove">
                <img src="styles/images/remove.png" alt="remove">
            </div>
        </div>
        `
    })

    document.querySelector("#listCartProduct").innerHTML = productCartHtmls.join("")
}



renderCart(cartLogin)
