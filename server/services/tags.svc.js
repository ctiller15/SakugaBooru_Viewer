const rp = require("request-promise-native");

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

module.exports = {
    getBooruTags,
}