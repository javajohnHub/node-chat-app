"use strict";
const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 4200;

let app = express();
app.use(express.static(publicPath));

app.listen(4200, () => {
    console.log('Server started on port 4200');
});
