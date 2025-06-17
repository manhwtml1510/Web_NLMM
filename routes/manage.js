const express = require('express');
const pool = require("../config/db");
const requireRole = require('../middleware/auth');
const router = express.Router()


router.use(requireRole(['Nhân viên', 'Quản lí']));

router.get('/products', async  (req,res) => {
    let[rows] = await  pool.    query('SELECT * FROM `san_pham`')
    res.render('ejs/main_layout.ejs', {
        contentToInclude:'products.ejs',
        data: rows

    })
})

router.get('/accounts', async  (req,res) => {
    let[rows] = await  pool.query('SELECT * FROM `accounts`')
    res.render('/admin-views/layout.ejs', {
        contentToInclude:'accounts',
        data: rows

    })
})






module.exports = router;