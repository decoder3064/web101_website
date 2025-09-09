require('dotenv').config();
const express = require('express');
const {google} = require('googleapis');
const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');
const nodemailer = require("nodemailer");

const path = require('path');


const app = express()//creates app
const port = process.env.PORT || 3000;


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
        credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
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
                subject: `Nueva Forma de Contacto: ${name}`,
                text: `Has Recibido un Nuevo Mensaje:\n\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
                replyTo: email 
            });

            const confirmation = await transporter.sendMail({
                from: '"Entre Runners" <entrerunners.dev@gmail.com>',
                to: email,
                subject: "¡Gracias por contactarnos!",
                text: "Hemos recibido tu mensaje. Nuestro equipo revisará tu solicitud y nos pondremos en contacto contigo muy pronto. ¡Gracias por confiar en Entre Runners!",
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h2 style="color: #0066cc;">¡Gracias por contactarnos!</h2>
                        <p>Hemos recibido tu mensaje y nuestro equipo ya está trabajando para darte la mejor respuesta posible.</p>
                        <p><strong>Pronto nos pondremos en contacto contigo</strong> para brindarte más información.</p>
                        <br>
                        <p style="font-size: 14px; color: #555;">Atentamente,<br>El equipo de <strong>Entre Runners</strong></p>
                    </div>
                `
            });
            console.log("Mensaje enviado a: %s", email);
            console.log('Datos recibidos:', { name, email, message });
            res.json({ success: true, message: "Correo enviado exitosamente" });
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
