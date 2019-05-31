const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const pdfTemplate = require('./documents/index.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/create-pdf', (req, res) => { 
    pdf.create(pdfTemplate(req.body), {})
    .toFile('rezultati.pdf', (err) => {
        if(err) {
            return console.log('error');
        }
        res.send(Promise.resolve())  
    });
});

app.get('/fetch-pdf', (req, res) => { 
    res.sendFile(`${__dirname}/rezultati.pdf`);
});