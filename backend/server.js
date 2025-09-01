require('dotenv').config();
const express = require('express');
const {google} = require('googleapis');
const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');
const nodemailer = require("nodemailer");

const path = require('path');


const app = express()//creates app
const port = 3000

app.use(express.json());
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

    const transImages = toURL(response.data.files);

    console.log(transImages);

    res.json({
        message: "Connected to Google Grive!",
        images: transImages
    });
    }

   catch(error){
    console.error('Google Drive API Error:', error);
    res.status(500).json({error: 'Failed to fetch images'});

   }
});


app.post('/api/contact', async (req, res) =>{
    try{
         const {name, email, message} = req.body;
         console.log(process.env.EMAIL_USER);

         const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            }
        });

            const emailSent = await transporter.sendMail({
                from:'"Entre Runners Website" <entrerunners.dev@gmail.com>',
                to: process.env.EMAIL_TO,
                subject: `New Contact Form: ${name}`,
                text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
                replyTo: email 
            });

            const confirmation = await transporter.sendMail({
                from:'"Entre Runners" <entrerunners.dev@gmail.com>',
                to: email,
                subject:"Test Response",
                text:"This is a test!",
                html: "<p>This is a test!</p>"
                });

        console.log("Message sent: %s", emailSent.messageId);
        console.log('Received data:', { name, email, message });
        res.json({ success: true, message: "Emails sent successfully" });


    }
    catch (error){
        console.error('Email error: ', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email' 
        });
    };
});

function toURL(files){
    return files.map(file =>{
        return {url:`https://lh3.googleusercontent.com/d/${file.id}`,
                name: file.name};
    });
};
