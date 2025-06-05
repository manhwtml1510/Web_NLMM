const express = require('express');
const pool = require("../config/db");
const router = express.Router()



router.get('/products', async  (req, res) => {
    let[rows, fields] = await  pool.query('SELECT * FROM `products`')
    res.json(rows);

});

router.get('/accounts', (req, res) => {
    const query = 'SELECT * FROM accounts';  // sửa theo bảng bạn muốn

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi truy vấn database' });
        }

        // Trả dữ liệu dưới dạng JSON
        res.json(results);
    });
});


module.exports = router;