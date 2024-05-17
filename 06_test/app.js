const app = require('express')();
const axios = require('axios');

app.get('/getAuthorName', async (req, res) => {
    const authorName = req.query.author;
    if (!authorName) {
        return res.status(400).json({ error: true, quote: {} })
    }
    const getQuoteByAuthorName = `http://api.quotable.io/quotes/random?author=${authorName}`;
    const resp = await axios.get(getQuoteByAuthorName);
    return res.status(200).json({ error: false, quote: resp.data });
})

module.exports = app;