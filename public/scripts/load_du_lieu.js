// Trang bộ sưu tập
function LoadSanPham(phanLoai = null) {
    fetch('shop-data/san-pham')
        .then(res => res.json())
        .then(data => {
            if (phanLoai) {
                data = data.filter(sanPham => sanPham.phan_loai === phanLoai);
            }
            HienThiSanPham(data)
        })
        .catch(error => {
            console.error(error);
        });
}
function HienThiSanPham(data) {
    let listProduct = document.getElementById('listProduct');
    listProduct.innerHTML = ``
    data.forEach(sanPham => {
        listProduct.innerHTML += `
    <li class="product-card width20" onclick="changeURL('/san-pham/${sanPham.id_san_pham}')">
            <div class="">
                <br>
                <a>
                    <img class="product-img " src="../images/products/${sanPham.id_san_pham}.png" alt="">
                </a>
            </div>
            <div class="hover-red product-content">
            <br>
                <h3 class="">${sanPham.ten_san_pham}</h3><br>
                <p class="">${Number(sanPham.gia_ban).toLocaleString('vi-VN')} vnđ</p>
            </div>
        </li>
    `
    });
}



// Trang cá nhân
function LoadTrangCaNhan() {
    fetch('user-data/thong-tin-tai-khoan')
        .then(res => res.json())
        .then(data => {
            HienThiTrangCaNhan(data)
        })
        .catch(error => {
            console.error(error);
        });
}
function HienThiTrangCaNhan(data) {
    let userInfo = document.getElementById('content');
    userInfo.innerHTML = `
        <h2>Thông tin cá nhân</h2>
        <p>Tên: ${data.ten_nguoi_dung}</p>
        <p>Số dư tài khoản: ${data.so_du}</p>
        <p>Email: ${data.email}</p>
        <p>Số điện thoại: ${data.so_dien_thoai}</p>
        <p>Địa chỉ: ${data.dia_chi}</p>
        <button class="button" onclick="changeURL('/cap-nhat-thong-tin')">Cập nhật thông tin</button>
    `;
}



// Giỏ hàng
function loadGioHang() {
    fetch('user-data/gio-hang')
        .then(res => res.json())
        .then(data => {
            HienThiGioHang(data)
        })
        .catch(error => {
            console.error(error);
        });
}

function HienThiGioHang(data) {
    let gioHang = document.getElementById('content');
    gioHang.innerHTML = ``;

    if (data.length === 0) {
        gioHang.innerHTML += `<p>Giỏ hàng của bạn hiện đang trống.</p>`;
        return;
    }

    data.forEach(item => {
        if (item.so_luong_san_pham) {
            gioHang.innerHTML += `
            <li class="full-width container form-1">
                <div class="width10">
                    <img src="../images/products/${item.id_san_pham}.png" class="product-img" alt="">
                </div>
                <div class="width50">
                    <p class="f28">${item.ten_san_pham}</p>
                </div>
                <div class="width20">
                    <button class="f28 button" onclick="CapNhatSoLuong(${item.id_san_pham},(${item.so_luong_san_pham} -1))">-</button>
                    <a class="f28 form-2">${item.so_luong_san_pham}</a>
                    <button class="f28 button" onclick="CapNhatSoLuong(${item.id_san_pham},(${item.so_luong_san_pham} + 1))">+</button>
                </div>
                <div class="width10">
                    <button class="f28 button" onclick="CapNhatSoLuong(${item.id_san_pham}, 0)">Xóa</button>
                </div>
            <li>
        `;
        }

    });
}
function CapNhatSoLuong(idSanPham, thayDoi) {
    fetch('user-data/cap-nhat-so-luong', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_san_pham: idSanPham,
            so_luong: thayDoi
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                loadGioHang();
            }
        })
        .catch(error => {
            console.error('Lỗi cập nhật:', error);
        });

}





// Load dữ liệu tùy theo trang
setTimeout(() => {
    switch (window.location.pathname) {
        case '/bo-suu-tap':
            LoadSanPham()
            break;
        case '/trang-ca-nhan':
            LoadTrangCaNhan()
            break;
        case '/gio-hang':
            loadGioHang()
            break;
        default:
            break;
    }
}, 100);


