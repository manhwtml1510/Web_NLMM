function closeForm() {
    dataForm.style.display = "none";
    dataFormContent.innerHTML = '';
}


class QuanLyBang{
    constructor (tableName, objectName, PK1name, PK2name) {
        this._tableName = tableName;
        this._PK1name = PK1name;
        this._PK2name = PK2name;
        this.objectName = objectName;
        this.tableLocation = document.getElementById('manageTable')
    }

    Them() {
        dataFormContent.action = `/manage-data/${this._tableName}`;
        dataFormContent.method = 'POST';
        dataForm.style.display = "block";
    }
    Sua(PK1, PK2) {
        if (PK2) {
            dataFormContent.action = `/manage-data/${this._tableName}/${PK1}/${PK2}`;
        } else {
            dataFormContent.action = `/manage-data/${this._tableName}/${PK1}`;
        }
        dataFormContent.method = 'PUT';
        dataForm.style.display = "block";
    }
    Xoa(PK1, PK2) {
        if (confirm(`Bạn có chắc muốn xóa không?S` )) {
            if (!PK2) {
                fetch(`/manage-data/${this._tableName}/${this._PK1name}/${PK1}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        alert(data.message);
                        this.LayDuLieu()
                    })
                    .catch(error => {
                        alert('Xóa thất bại. Hãy kiểm tra lại khóa ngoại.');
                        console.error(error);
                    })
            } else {
                fetch(`/manage-data/${this._tableName}/${this._PK1name}/${PK1}/${this._PK2name}/${PK2}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(res => res.json())
                    .then(data => {alert(data.message);
                        this.LayDuLieu()
                    })
                    .catch(error => {alert('Xóa thất bại. Hãy kiểm tra lại khóa ngoại.');
                        console.error(error);})
            }
        }

        }


    LayDuLieu() {
        fetch(`/manage-data/${this._tableName}`)
            .then(res => res.json())
            .then(data => {
                this.tableLocation .innerHTML = '';
                this.HienThiDuLieu(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    HienThiDuLieu(data) {
        data.forEach(item => {
            let rowData = ''
            Object.values(item).forEach(value => {
                rowData += `<td>${value}</td>`;
            })
            if (this._PK2name) {
                rowData += `<td><button onclick="${this.objectName}.Sua(${item[this._PK1name]}, ${item[this._PK2name]})">Sửa</button> <button onclick="${this.objectName}.Xoa(${item[this._PK1name]}, ${item[this._PK2name]})">Xóa</button></td>`
            } else {
                rowData += `<td><button onclick="${this.objectName}.Sua(${item[this._PK1name]})">Sửa</button> <button onclick="${this.objectName}.Xoa(${item[this._PK1name]})">Xóa</button></td>`
            }

            this.tableLocation .innerHTML += `<tr>${rowData}</tr>`
        })

    }
}


class SanPhamTable extends QuanLyBang {
    constructor() {
        super('san_pham','sanPham', 'id_san_pham');
    }

    Them() {
        dataFormContent.innerHTML = `
            <div class="full-width container">
                <label for="ten_san_pham" class="width20">Tên sản phẩm:</label>
                <input type="text" id="ten_san_pham" name="ten_san_pham" class="form-2 width60" required>
            </div>
            <div class="full-width container">
                <label for="thuong_hieu" class="width20">Thương hiệu:</label>
                <input type="text" id="thuong_hieu" name="thuong_hieu" class="form-2 width60" required>
            </div>
            <div class="full-width container">
                <label for="gia_ban" class="width20">Giá:</label>
                <input type="number" id="gia_ban" name="gia_ban" class="form-2 width60" required>
            </div>
            <div class="full-width container">
                <label for="mo_ta" class="width20">Mô tả:</label>
                <input type="text" id="mo_ta" name="mo_ta" class="form-2 width60" required>
            </div>  
            <div class="full-width container">
                <label for="dung_tich" class="width20">Dung tích:</label>
                <input type="text" id="dung_tich" name="dung_tich" class="form-2 width60" required>
            </div>
            <div  class="full-width container">  
                <label for="xuat_su" class="width20">Xuất xứ:</label>
                <input type="text" id="xuat_su" name="xuat_su" class="form-2 width60" required>
            </div>
            <div class="full-width container">
                <label for="phan_loai" class="width20">Phân loại:</label>
                <select id="phan_loai" name="phan_loai" class="form-2 width60" required>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Unisex">Unisex</option>
                </select>
            </div><br>
            <button class="button" type="submit">Xác nhận</button>
        `
        super.Them();
    }

    Sua(id_san_pham) {
        super.Sua(id_san_pham)
    }

    Xoa(id_san_pham) {
        super.Xoa(id_san_pham);

    }

    LayDuLieu() {
        super.LayDuLieu()
        addBUtton.onclick = () => {sanPham.Them()}
    }

    HienThiDuLieu(data) {
        this.tableLocation.innerHTML = `
            <tr>
            <td>ID</td>
            <td>Tên</td>
            <td>Thương hiệu</td>
            <td>Giá</td>
            <td>Mô tả</td>
            <td>Dung tích</td>
            <td>Xuất sứ</td>
            <td>Phân Loại</td>
            <td>Tồn kho</td>
            <td>Hành dộng</td>
            </tr>
        `;
        super.HienThiDuLieu(data);
    }
}

class TaiKHoanTable extends QuanLyBang {
    constructor() {
        super('tai_khoan','taiKhoan', 'id_tai_khoan');
    }

    Them() {
        super.Them();
    }

    Sua(id_tai_khoan) {
        super.Sua()
    }

    Xoa(id_tai_khoan) {
        super.Xoa(id_tai_khoan);
    }

    LayDuLieu() {
        super.LayDuLieu();
        addBUtton.onclick = () => {taiKhoan.Them()}
    }

    HienThiDuLieu(data) {
        this.tableLocation.innerHTML = `
            <tr>
            <td>ID</td>
            <td>Tên đăng nhập</td>
            <td>Mật khẩu</td>
            <td>Họ và tên</td>
            <td>Vai trò</td>
            <td>Số dư</td>
            <td>Số điện thoại</td>
            <td>Email</td>
            <td>Số dư</td>
            <td>Hành động</td>
            </tr>
        `;
        super.HienThiDuLieu(data);
    }
}


class NhapHanngTable extends QuanLyBang {
    constructor() {
        super('nhap_hang','nhapHang', 'id_nhap_hang', );
    }

    Them() {
        super.Them();
    }

    Sua(id_nhap_hang) {
        super.Sua(id_nhap_hang);
    }

    Xoa(id_nhap_hang, id_san_pham) {
        super.Xoa(id_nhap_hang);
    }

    LayDuLieu() {
        super.LayDuLieu();
        addBUtton.onclick = () => {nhapHang.Them()}
    }

    HienThiDuLieu(data) {
        this.tableLocation.innerHTML = `
            <tr>
            <td>ID Nhập</td>
            <td>ID Sản phẩm</td>
            <td>Số lượng</td>
            <td>Ngày nhập</td>
            <td>Giá nhập</td>
            <td>Hành động</td>
            </tr>
        `;
        super.HienThiDuLieu(data);
    }
}


class HoaDonTable extends QuanLyBang {
    constructor() {
        super('hoa_don','hoaDon', 'id_hoa_don');
    }

    Them() {
        super.Them();
    }

    Sua(id_hoa_don) {
        super.Sua(id_hoa_don);
    }

    Xoa(id_hoa_don) {
        super.Xoa(id_hoa_don);
    }

    LayDuLieu() {
        super.LayDuLieu();
        addBUtton.onclick = () => {hoaDon.Them()}
    }

    HienThiDuLieu(data) {
        this.tableLocation.innerHTML = `
            <tr>
            <td>ID Hóa đơn</td>
            <td>ID Khách hàng</td>
            <td>Ngày lập</td>
            <td>Tổng tiền</td>
            <td>Hành động</td>
            </tr>
        `;
        super.HienThiDuLieu(data);
    }
}

class NapTienTable extends QuanLyBang {
    constructor() {
        super('nap_tien','napTien', 'id_giao_dich');
    }

    Them() {
        super.Them()
    }

    Sua(id_giao_dich) {
        super.Sua(id_giao_dich);
    }

    Xoa(id_giao_dich) {
        super.Xoa(id_giao_dich);
    }

    LayDuLieu() {
        super.LayDuLieu();
        addBUtton.onclick = () => {napTien.Them()}
    }

    HienThiDuLieu(data) {
        this.tableLocation.innerHTML = `
            <tr>
            <td>ID Giao dịch</td>
            <td>ID Tài khoản</td>
            <td>Số tiền</td>
            <td>Ngày nạp</td>
            <td>Hành động</td>
            </tr>
        `;
        super.HienThiDuLieu(data);
    }
}

class GioHangTable extends QuanLyBang {
    constructor() {
        super('gio_hang','gioHang', 'id_tai_khoan', 'id_san_pham');
    }

    Them() {
        super.Them();
    }

    Sua(id_tai_khoan, id_san_pham) {
        super.Sua(id_tai_khoan, id_san_pham);
    }

    Xoa(id_tai_khoan, id_san_pham) {
        super.Xoa(id_tai_khoan, id_san_pham);
    }

    LayDuLieu() {
        super.LayDuLieu();
        addBUtton.onclick = () => {gioHang.Them()}
    }

    HienThiDuLieu(data) {
        this.tableLocation.innerHTML = `
            <tr>
            <td>ID Tài khoản</td>
            <td>ID Sản phẩm</td>
            <td>Số lượng</td>
            <td>Hành động</td>
            </tr>
        `;
        super.HienThiDuLieu(data);
    }
}

class HoaDonChiTietTable extends QuanLyBang {
    constructor() {
        super('hoa_don_chi_tiet','hoaDonChiTiet', 'id_hoa_don', 'id_san_pham');
    }

    Them() {
        super.Them();
    }

    Sua(id_hoa_don, id_san_pham) {
        super.Sua(id_hoa_don, id_san_pham);
    }

    Xoa(id_hoa_don, id_san_pham) {
        super.Xoa(id_hoa_don, id_san_pham);
    }

    LayDuLieu() {
        super.LayDuLieu();
        addBUtton.onclick = () => {hoaDonChiTiet.Them()}
    }

    HienThiDuLieu(data) {
        this.tableLocation.innerHTML = `
            <tr>
            <td>ID Hóa đơn</td>
            <td>ID Sản phẩm</td>
            <td>Số lượng</td>
            <td>Hành động</td>
            </tr>
        `;
        super.HienThiDuLieu(data);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.sanPham = new SanPhamTable();
    window.taiKhoan = new TaiKHoanTable();
    window.nhapHang = new NhapHanngTable();
    window.hoaDon = new HoaDonTable();
    window.napTien = new NapTienTable();
    window.gioHang = new GioHangTable();
    window.hoaDonChiTiet = new HoaDonChiTietTable();

    window.dataForm = document.getElementById("dataForm");
    window.dataFormContent = document.getElementById("dataFormContent");
    window.addBUtton = document.getElementById("addRow");
});