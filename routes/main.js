const express = require('express');
const pool = require("../config/db");
const path = require("path");
const router = express.Router()


router.get('/', (req, res) => {
    res.redirect('/trang-chu');
})
router.get('/lien-he', (req, res) => {
  res.render('index', { contentToInclude: 'lien-he' });
});
router.get('/register', (req, res) => {
    res.render('register'); 
});
router.get('/fg_password', (req, res) => {
  res.render('index', {
    contentToInclude: 'fg_password.ejs'
  });
});

router.get('/trang-chu', (req, res) => {
  res.render('index', { contentToInclude: 'trang-chu' });
});

router.get('/:page', (req, res) => {
    const page = req.params.page;
    res.render('index', { contentToInclude: page });
});


router.get('/san-pham/:id', async (req, res) => {
    const id = req.params.id;
    let [rows] = await pool.query('SELECT * FROM san_pham WHERE id_san_pham = ?', [id]);

    if (!rows.length) {
        return res.status(404).send('Không tìm thấy sản phẩm');
    }
    res.render('index', {
        contentToInclude: 'san-pham',
        san_pham: rows[0]
    });
});



module.exports = router;