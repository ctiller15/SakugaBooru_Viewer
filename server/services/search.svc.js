const rp = require("request-promise-native");

const getBooruData = (query) => {
    let uri = "https://www.sakugabooru.com/post.json?limit=10";
    if(query){
        uri += `&tags=${query}`;
    }
    return rp.get({
        uri: uri,
        json: true
    });
}

module.exports = {
    getBooruData,
}