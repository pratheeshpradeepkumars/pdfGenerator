import React from 'react';
import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';

class App extends React.Component  {
    state = {  
        name: 'Adrian',   
        receiptId: 0,   
        price1: 0,   
        price2: 0,
    };
    handleChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };
    downloadPDF = () => {
         axios.post('/create-pdf', this.state)
         .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
         .then((res) => {   
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'generatedDocument.pdf')
        });
    };
    getPDF =() => {
        return axios.get('/print-pdf', {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/pdf'
            }
        });
    }
    savePDF = () => {
        return this.getPDF() // API call
        .then((response) => {
            const blob = new Blob([response.data], {type: 'application/pdf'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `your-file-name.pdf`
            link.click()
        }).catch(err => {console.log(err);});
    }
    render() {
        return (
            <div className="App">
                <button onClick={this.savePDF}>Save as PDF</button>
                <input type="text" 
                    placeholder="Name" 
                    name="name" 
                    onChange = {this.handleChange}
                />   
                <input type="number" 
                    placeholder="Receipt ID" 
                    name="receiptId"    
                    onChange={this.handleChange}
                />
                <input 
                    type="number" 
                    placeholder="Price 1" 
                    name="price1" 
                    onChange = {this.handleChange}
                />   
                <input 
                type="number" 
                placeholder="Price 2" 
                name="price2" 
                onChange={this.handleChange}
                />   
                <button 
                onClick={this.downloadPDF}>
                    Download PDF
                </button>
            </div>
        );
        
    }
}


export default App;
