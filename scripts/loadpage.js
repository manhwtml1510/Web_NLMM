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
            else if (page === "giohang") {
                // Lấy cart mới nhất từ localStorage
                cart = JSON.parse(localStorage.getItem("cart")) || [];

                // Đảm bảo quantity = 1 nếu chưa có
                cart.forEach(product => {
                    if (!product.quantity || product.quantity < 1) {
                        product.quantity = 1;
                    }
                });
                function mergeCartDuplicates(cartList) {
                    const merged = []
                    const map = {}
                
                    cartList.forEach(product => {
                        const key = product.ten + "|" + product.thuonghieu
                        const quantity = product.quantity || 1
                        if(!map[key]) {
                            map[key] = {...product}
                            map[key].quantity = quantity
                            map[key].gia = product.gia
                            map[key].giaDon = product.gia * quantity
                        } else {
                            map[key].quantity += quantity
                            map[key].giaDon = map[key].gia * map[key].quantity
                        }
                    })
                
                    for (let key in map) {
                        merged.push(map[key])
                    }
                
                    return merged
                }
                
                // Gộp trùng rồi lưu lại
                cart = mergeCartDuplicates(cart)
                localStorage.setItem("cart", JSON.stringify(cart))

                renderCart(cart)
            }
        })
        .catch(error => {
            console.error('Lỗi:', error)
            mainContent.innerHTML = '<p>Không thể tải trang. Vui lòng thử lại sau.</p>'
        });
}
