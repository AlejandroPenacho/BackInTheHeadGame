const express = require('express');
var app = express();

const PORT = 8000;


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

app.use('/', (req,res) => {
    res.sendFile(`${__dirname}/${req.originalUrl}`);
})


app.listen(PORT, ()=>{
    console.log(`Server started in port ${PORT}`);
})