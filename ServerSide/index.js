const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 8080;

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send("<h1>Test whether server is working!</h1>");
});

app.use("/register", require("./routes/register"));

app.listen(PORT, () => {
    console.log("App listen on port: " + PORT);
});