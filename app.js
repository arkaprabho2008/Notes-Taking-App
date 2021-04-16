const express = require('express');
const app = express();
const port = 8000;

app.set('view-engine', 'ejs');
app.use('/static', express.static('static'));


app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.listen(port, () => {
    console.log('Your application has successfully started on port ', port);
})