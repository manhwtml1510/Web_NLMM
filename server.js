const express = require('express');
const pool = require('./config/db');
const path = require('path');
require('dotenv').config()

const app = express();
const port = process.env.PORT



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.render('layout', {
        contentToInclude: 'pages/home'
    })
})

app.get('/goi-thieu',(req,res)=> {
    res.render('layout', {
        contentToInclude: 'pages/about'
    })
})

app.get('/danh-sach-san-pham',async (req,res)=> {
    let[rows, fields] = await  pool.query('SELECT * FROM `product_table`')

    res.render('layout', {
        contentToInclude: 'pages/products',
        listProducts: rows
    })
})

app.get('/lien-he',(req,res)=> {
    res.render('layout', {
        contentToInclude: 'pages/contact'

    })
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`http://localhost:${port}`);
})