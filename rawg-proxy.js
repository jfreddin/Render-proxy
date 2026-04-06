// A simple RAWG Proxy for Render
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// The target RAWG API
const RAWG_BASE = 'https://api.rawg.io/api';

app.use(async (req, res) => {
    try {
        const path = req.path;
        console.log(`[Proxy Request] Path: ${path}`);
        
        const response = await axios.get(`${RAWG_BASE}${path}`, {
            params: req.query // The key will already be in the query from the CrackStore backend
        });
        
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(`[Proxy Error] ${error.message}`);
        res.status(error.response?.status || 500).json(error.response?.data || { message: "Proxy Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
