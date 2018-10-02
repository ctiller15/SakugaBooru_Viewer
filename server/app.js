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

app.get('/', (req, res) => {
    getBooruData()
        .then((response) => {
            res.send(response);
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});