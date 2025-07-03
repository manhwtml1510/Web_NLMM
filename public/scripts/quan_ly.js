
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
        if (!PK2) {
            fetch(`/shop-data/${this._tableName}/${this._PK1name}/${PK1}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(data => {alert(data.message);
                    this.LayDuLieu()
                })
                .catch()



        }
        else {

        }
    }

    LayDuLieu() {
        fetch(`/shop-data/${this._tableName}`)
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


class SanPhamManager extends QuanLyBang {
    constructor() {
        super('san_pham', 'id_san_pham');
    }

    Them() {

    }

    Sua(id_san_pham) {
        super.Sua()
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
            this.tableLocation.rows[i].cells[9].innerHTML = `<button onclick="sanPhamManager.Sua(${i})">Sửa</button> <button onclick="sanPhamManager.Xoa(${i})">Xóa</button>`;
        }

    }
}

class TaiKHoanManager extends QuanLyBang {
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
            this.tableLocation.rows[i].cells[9].innerHTML = `<button onclick="taiKhoanManager.Sua(${i})">Sửa</button> <button onclick="taiKhoanManager.Xoa(${i})">Xóa</button>`;
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    window.sanPhamManager = new SanPhamManager();
    window.taiKhoanManager = new TaiKHoanManager();
});






