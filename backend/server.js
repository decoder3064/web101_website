const express = require('express');//import express
const {google} = require('googleapis');
const path = require('path') 

const app = express()//creates app
const port = 3000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.get('/api/test',(req,res)=>{
    res.json({message: "Server is working!", status: "success"})
});

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});


app.get('/api/gallery-images', async (req, res) =>{
   try{
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'google-credentials.json'),
        scopes: ['https://www.googleapis.com/auth/drive.readonly']

    });

    const drive = google.drive({version:'v3', auth});

    const folderId = '1UIcXGf1M09J5wMORI9xjX0Sjd3B3MBA2';

    const response = await drive.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/'`,
        fields: 'files(id, name, mimeType)' 
    });
    res.json({
        message: "Connected to Google Grive!",
        images: response.data.files
    });
    }

   catch(error){
    console.error('Google Drive API Error:', error);
    res.status(500).json({error: 'Failed to fetch images'});

   }
});
