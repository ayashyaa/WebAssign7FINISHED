const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    console.log("Form data received:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.json({ success: true, msg: `Thank you, ${name}! Your request has been received.` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
