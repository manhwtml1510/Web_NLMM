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
    console.log(data)

    const columns = Object.keys(data).map(key => `\`${key}\``).join(', ');
    console.log(columns)
    const values = Object.values(data)
    console.log(values)
    const placeholders =  Object.keys(data).map(key => '?').join(', ');
    console.log(placeholders)
    const sql = `INSERT INTO \`${tableName}\` (${columns}) VALUES (${placeholders})`
    console.log(sql)
    await pool.query(sql ,values );


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

router.delete ('/:tableName/:PK1name/:PK1/:PK2name/:PK2', async (req, res) => {
    const tableName = req.params.tableName;
    const PK1name = req.params.PK1name;
    const PK1 = parseInt(req.params.PK1);
    const PK2name = req.params.PK2name;
    const PK2 = parseInt(req.params.PK2);
    await pool.query(`DELETE FROM \`${tableName}\` WHERE ${PK1name} = ? AND ${PK2name} = ?`, [PK1, PK2]);
    res.json({ success: true, message: 'Xóa thành công' });
})



module.exports = router;