const express = require('express')
const cors = require('cors')
const axios = require('axios');
const md5 = require('md5');


const app = express()


app.use(cors())
app.use(express.json())

app.get('/gravatar/:email', async (req, res) => {
    const { email } = req.params;
    console.log('eee', email);

    try {
        const hash = md5(email.trim().toLowerCase());
        const response = await axios.get(`https://www.gravatar.com/${hash}.json`);

        if (response.data && response.data.entry) {
            res.json(response.data.entry[0])
        } else {
            res.json(null)
        }
    } catch (error) {
        console.error('Error fetching Gravatar:', error.message)
        res.json(null)
    }
});

const PORT = 4000
app.listen(PORT ,  ()=>{
    console.log(`server listening on http://localhost:${PORT}`);
})


