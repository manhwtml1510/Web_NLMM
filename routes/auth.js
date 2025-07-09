const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/db');

router.get('/register', (req, res) => {
    res.render('register');
});


router.post('/register', async (req, res) => {
    const { username, password, fullName, vai_tro } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [existingUser] = await pool.query('SELECT * FROM nguoi_dung WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.send('Tên đăng nhập đã tồn tại!');
        }

        await pool.query(
            'INSERT INTO nguoi_dung (username, password, ho_ten, vai_tro) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, fullName, vai_tro]
        );

        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.send('Đăng ký thất bại!');
    }
});
// Giao diện lấy lại mật khẩu
router.get('/fg_password', (req, res) => {
    res.render('ejs/index', {
        contentToInclude: 'fg_password.ejs'
    });
});

// Xử lý lấy lại mật khẩu
router.post('/fg_password', async (req, res) => {
    const { username } = req.body;

    try {
        const [userRows] = await pool.query(
            'SELECT * FROM nguoi_dung WHERE ten_dang_nhap = ?',
            [username]
        );

        if (userRows.length === 0) {
            return res.send('Tài khoản không tồn tại.');
        }

        // Tạo mật khẩu mới (random)
        const newPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            'UPDATE nguoi_dung SET mat_khau = ? WHERE ten_dang_nhap = ?',
            [hashedPassword, username]
        );

        res.send(`
            <p>Mật khẩu mới của bạn là: <strong>${newPassword}</strong></p>
            <p><a href="/login">Đăng nhập</a></p>
        `);
    } catch (err) {
        console.error(err);
        res.send('Đã có lỗi xảy ra.');
    }
});
module.exports = router;
