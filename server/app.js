const express = require("express");
const app = express();
const config = require("./config/config");

const port = config !== null ? process.env.PORT : 3000;

// grabbing controllers
const search = require("./controllers/search");
const tags = require("./controllers/tags");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/search', search);
app.use('/tags', tags);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});