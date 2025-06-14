const express = require('express');
const pool = require("../config/db");
const router = express.Router()



router.post('/kiem-tra-dang-nhap', async  (req,res) => {

    const tai_khoan = req.body;
    let [rows] = await pool.query('SELECT * FROM `tai_khoan` WHERE `ten_tai_khoan` = ? AND `mat_khau` = ?', [tai_khoan.ten_tai_khoan, tai_khoan.mat_khau]);
    if (rows.length > 0) {
        // Đăng nhập thành công
        req.session.user = rows[0]
        res.redirect('/trang-ca-nhan');
    } else {
        res.redirect('/dang-nhap');
    }
})


router.get('/kiem-tra-trang-thai/:url', (req, res) => {

    if (req.session.user) {
        res.redirect(`/${req.params.url}`);
    } else {
        res.redirect('/dang-nhap');
    }
})

router.get('/dang-xuat', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/trang-chu');
        }
    });
})


module.exports = router;