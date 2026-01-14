const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

// Use the PORT provided by Koyeb, or 8000 for local testing
const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.send("No URL provided");
    try {
        const response = await fetch(targetUrl);
        const body = await response.text();
        res.send(body);
    } catch (err) {
        res.status(500).send("Proxy Error");
    }
});

// IMPORTANT: This keeps the server running!
// Use "0.0.0.0" to allow external connections
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server is LIVE on port ${PORT}`);
});