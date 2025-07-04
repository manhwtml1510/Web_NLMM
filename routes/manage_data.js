const express = require('express');
const pool = require("../config/db");
const requireRole = require('../middleware/auth');
const router = express.Router()




router.use(requireRole(['Quản lý']));

router.get('/:tableName', async  (req, res) => {
    const tableName = req.params.tableName;
    const [rows] = await pool.query(`SELECT * FROM \`${tableName}\``);
    res.json(rows);

});

router.post('/:tableName', async (req, res) => {
    const tableName = req.params.tableName;
    const data = req.body;

    const columns = Object.keys(data).map(key => `\`${key}\``).join(', ');
    const values = Object.values(data).map(value => `'${value}'`).join(', ');
    const placeholders = columns.map(() => '?').join(', ');

    await pool.query(`INSERT INTO \`${tableName}\` (${columns.join(',')}) VALUES (${placeholders})`, values);


});

router.put('/:tableName/:PKname/:PK', async (req, res) => {
    const tableName = req.params.tableName;
    const PKname = req.params.PKname;
    const PK = parseInt(req.params.PK);
    const data = req.body;

    // Kiểm tra xem dữ liệu có chứa khóa chính không
    if (!data[PKname]) {
        return res.status(400).json({ success: false, message: 'Thiếu khóa chính trong dữ liệu' });
    }

    // Cập nhật dữ liệu
    await pool.query(`UPDATE \`${tableName}\` SET ? WHERE ${PKname} = ?`, [data, PK]);

    res.json({ success: true, message: 'Cập nhật thành công' });
});


router.delete('/:tableName/:PKname/:PK', async (req, res) => {
    const tableName = req.params.tableName;
    const PKname = req.params.PKname;
    const PK = parseInt(req.params.PK);
    await pool.query(`DELETE FROM \`${tableName}\` WHERE ${PKname} = ?`, [PK]);
    res.json({ success: true, message: 'Xóa thành công' });

});



module.exports = router;