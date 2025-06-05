const express = require('express');
const pool = require("../config/db");
const router = express.Router()



router.get('/', async  (req,res) => {

    res.render('manage', {
        contentToInclude:'pages/manage/home'
    })
})


router.get('/products', async  (req,res) => {
    let[rows, fields] = await  pool.query('SELECT * FROM `products`')
    res.render('manage', {
        contentToInclude:'pages/manage/products',
        data: rows

    })
})

router.get('/accounts', async  (req,res) => {
    let[rows, fields] = await  pool.query('SELECT * FROM `accounts`')
    res.render('manage', {
        contentToInclude:'pages/manage/accounts',
        data: rows

    })
})






module.exports = router;