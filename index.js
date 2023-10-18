const express = require('express');
const app = express();
require("dotenv").config()
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/', require('./routes/LoadFileRouter'));
app.listen(port, () => { console.log(`Servidor No Ar. Porta ${port}`); })