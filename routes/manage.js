const express = require('express');
const pool = require("../config/db");
const router = express.Router()




router.get('/products', async  (req,res) => {
    let[rows] = await  pool.query('SELECT * FROM `products`')
    res.render('admin-views/layout.ejs', {
        contentToInclude:'products',
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