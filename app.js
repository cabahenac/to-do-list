const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let port = 3000;

let items = ['Comprar comida', 'Cocinar la comida', 'Comer la comida']


app.get('/', (req, res) => {
    let today = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    };

    let day = today.toLocaleDateString('es-MX', options);

    res.render('list', { day: day, items: items });
});


app.post('/', (req, res) => {
    let item = req.body.newItem;

    items.push(item);

    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server initialized at port ${port}`);
});