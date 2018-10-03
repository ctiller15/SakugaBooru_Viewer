const rp = require("request-promise-native");
const express = require("express");
const app = express();
const port = 3000;

const getBooruData = () => {
    return rp.get({
        uri: "https://www.sakugabooru.com/post.json?limit=10",
        json: true
        });
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    console.log("I've been hit!!!");
    getBooruData()
        .then((response) => {
            res.send(response);
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});