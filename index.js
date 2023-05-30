const express = require('express');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 9898;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/getBase64', async (req, res) => {
    const { url } = req.body;
    try {
        const base64Url = await getBase64URL(url);
        res.json({ erorr: false, base64Url });
    } catch (error) {
        console.error(error);
        res.json({ error: error });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});

async function getBase64URL(url) {
    const response = await axios.get(url, {
        responseType: 'arraybuffer',
    });

    // Convert the image data to a base64 URL
    const data = Buffer.from(response.data, 'binary').toString('base64');
    const base64Url = `data:${response.headers['content-type']};base64,${data}`;
    return base64Url;
}