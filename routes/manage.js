const express = require('express');
const pool = require("../config/db");
const requireRole = require('../middleware/auth');
const router = express.Router()


router.use(requireRole(['Nhân viên', 'Quản lý']));

router.get('/selection', async (req, res) => {
    res.render('/ejs/index.ejs', {
        contentToInclude:'action_select.ejs',
    })
})


router.get('/tao-hoa-don' , async (req, res) => {
    res.render('/ejs/index.ejs', {
        contentToInclude:'invoice_form.ejs',
    })
})

router.post('/tao-hoa-don', async (req, res) => {
    const { customerName, customerEmail, productId, quantity } = req.body;


});


module.exports = router;