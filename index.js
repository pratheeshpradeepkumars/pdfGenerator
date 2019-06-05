const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const pdfTemplate = require('./documents/index.js');
const puppeteer = require('puppeteer')
 
async function printPDF() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'});
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();
    return pdf;
}


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

app.get('/print-pdf', async (req, res) => { 
    console.log('Please wait printing pdf is in progress');
    let pdf = await printPDF();
    console.log(pdf);
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
    res.send(pdf);
   
});


