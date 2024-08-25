import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        console.log(req.file!.originalname)
        const fileMetadata = {
            name: req.file!.originalname,
        };
        const media = {
            mimeType: req.file!.mimetype,
            body: fs.createReadStream(req.file!.path),
        };
        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id',
        });

        fs.unlinkSync(req.file!.path); // remove the filpe after upload

        res.status(200).json({ fileId: response.data.id });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file.');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
