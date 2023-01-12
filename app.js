const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let port = 3000;

let items = ['Comprar comida', 'Cocinar la comida', 'Comer la comida'];
let workItems = [];


app.get('/', (req, res) => {
    let today = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    };

    let day = today.toLocaleDateString('es-MX', options);

    res.render('list', { listTitle: day, items: items });
});


app.get('/work', (req, res) => {
    res.render('list', { listTitle: 'Pendientes de trabajo', items: workItems });
});


app.post('/', (req, res) => {
    let item = req.body.newItem;
    if (req.body.list === 'Pendientes') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
});


app.post('/work', (req, res) => {
    let item = req.body.newItem;

    workItems.push(item);

    res.redirect('/work');
});


app.listen(port, () => {
    console.log(`Server initialized at port ${port}`);
});