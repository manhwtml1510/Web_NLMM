const dataForm = document.getElementById("dataForm");
function closeForm() {
    dataForm.style.display = "none";
}


class QuanLyBang{
    constructor (tableName, PK1name, PK2name = null) {
        this._tableName = tableName;
        this._PK1name = PK1name;
        this._PK2name = PK2name;
        this.tableLocation = document.getElementById('manageTable')
    }

    Them() {
        dataForm.style.display = "block";
    }
    Sua(PK1, PK2 = null) {
        dataForm.style.display = "block";
    }
    Xoa(PK1, PK2 = null) {
        if (confirm("Bạn có chắc muốn xóa không?")) {
            if (!PK2) {
                fetch(`/manage-data/${this._tableName}/${this._PK1name}/${PK1}`, {
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
            else {

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
            rowData += `<td></td>`
            this.tableLocation .innerHTML += `<tr>${rowData}</tr>`
        })
    }
}


class SanPhamTable extends QuanLyBang {
    constructor() {
        super('san_pham', 'id_san_pham');
    }

    Them() {

    }

    Sua(id_san_pham) {
        super.Sua(id_san_pham)
    }

    Xoa(id_san_pham) {
        super.Xoa(id_san_pham);

    }

    LayDuLieu() {
        super.LayDuLieu()
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
        for (let i = 1; i < this.tableLocation.rows.length; i++) {
            this.tableLocation.rows[i].cells[9].innerHTML = `<button onclick="sanPham.Sua(${i})">Sửa</button> <button onclick="sanPham.Xoa(${i})">Xóa</button>`;
        }

    }
}

class TaiKHoanTable extends QuanLyBang {
    constructor() {
        super('tai_khoan', 'id_tai_khoan');
    }

    Them() {

    }

    Sua(id_tai_khoan) {
        super.Sua()
    }

    Xoa(id_tai_khoan) {
        super.Xoa(id_tai_khoan);
    }

    LayDuLieu() {
        super.LayDuLieu();
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
        for (let i = 1; i < this.tableLocation.rows.length; i++) {
            this.tableLocation.rows[i].cells[9].innerHTML = `<button onclick="taiKhoan.Sua(${i})">Sửa</button> <button onclick="taiKhoan.Xoa(${i})">Xóa</button>`;
        }
    }
}


class NhapHanngTable extends QuanLyBang {
    constructor() {
        super('nhap_hang', 'id_nhap_hang', );
    }

    Them() {

    }

    Sua(id_nhap_hang) {
        super.Sua(id_nhap_hang);
    }

    Xoa(id_nhap_hang, id_san_pham) {
        super.Xoa(id_nhap_hang);
    }

    LayDuLieu() {
        super.LayDuLieu();
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
        for (let i = 1; i < this.tableLocation.rows.length; i++) {
            this.tableLocation.rows[i].cells[5].innerHTML = `<button onclick="nhapHang.Sua(${i})">Sửa</button> <button onclick="nhapHang.Xoa(${i})">Xóa</button>`;
        }
    }
}


class HoaDonTable extends QuanLyBang {
    constructor() {
        super('hoa_don', 'id_hoa_don');
    }

    Them() {

    }

    Sua(id_hoa_don) {
        super.Sua(id_hoa_don);
    }

    Xoa(id_hoa_don) {
        super.Xoa(id_hoa_don);
    }

    LayDuLieu() {
        super.LayDuLieu();
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
        for (let i = 1; i < this.tableLocation.rows.length; i++) {
            this.tableLocation.rows[i].cells[4].innerHTML = `<button onclick="hoaDon.Sua(${i})">Sửa</button> <button onclick="hoaDon.Xoa(${i})">Xóa</button>`;
        }
    }
}

class NapTienTable extends QuanLyBang {
    constructor() {
        super('nap_tien', 'id_nap_tien');
    }

    Them() {

    }

    Sua(id_nap_tien) {
        super.Sua(id_nap_tien);
    }

    Xoa(id_nap_tien) {
        super.Xoa(id_nap_tien);
    }

    LayDuLieu() {
        super.LayDuLieu();
    }

    HienThiDuLieu(data) {
        this.tableLocation.innerHTML = `
            <tr>
            <td>ID Nạp</td>
            <td>ID Tài khoản</td>
            <td>Số tiền</td>
            <td>Ngày nạp</td>
            <td>Hành động</td>
            </tr>
        `;
        super.HienThiDuLieu(data);
        for (let i = 1; i < this.tableLocation.rows.length; i++) {
            this.tableLocation.rows[i].cells[4].innerHTML = `<button onclick="napTien.Sua(${i})">Sửa</button> <button onclick="napTien.Xoa(${i})">Xóa</button>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.sanPham = new SanPhamTable();
    window.taiKhoan = new TaiKHoanTable();
    window.nhapHang = new NhapHanngTable();
    window.hoaDon = new HoaDonTable();
    window.napTien = new NapTienTable();
});