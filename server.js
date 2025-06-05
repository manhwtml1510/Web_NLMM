require('dotenv').config()
const express = require('express');
const path = require('path');
const api = require('./routes/api')
const manage_routes = require('./routes/manage')


const app = express();
const port = process.env.PORT

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/api', api);


app.use('/manage', manage_routes);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`http://localhost:${port}`);
})