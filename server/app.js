const rp = require("request-promise-native");
const express = require("express");
const app = express();
const port = 3000;

const getBooruData = (query) => {
    let uri = "https://www.sakugabooru.com/post.json?limit=10";
    if(query){
        uri += `&tags=${query}`;
    }
    //const uri = `https://www.sakugabooru.com/post.json?limit=10&tags=${query}`;
    return rp.get({
        uri: uri,
        json: true
    });
}

const getBooruTags = (query) => {
    let uri = "https://www.sakugabooru.com/tag.json?limit=10";
    if(query){
        uri += `&name=${query}`;
    }

    return rp.get({
        uri: uri,
        json: true
    });
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    //console.log(req);
    //console.log("I've been hit!!!");
    getBooruData()
        .then((response) => {
            res.send(response);
        });
});

app.get('/search/:searchQuery', (req, res) => {
    console.log(req.params.searchQuery);
    const searchQuery = req.params.searchQuery;
    getBooruData(searchQuery)
        .then((response) => {
            res.send(response);
        });
});

app.get('/tags/:searchQuery', (req, res) => {
    console.log(req.params.searchQuery);
    const searchQuery = req.params.searchQuery;
    getBooruTags(searchQuery)
        .then((response) => {
            res.send(response);
        });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});