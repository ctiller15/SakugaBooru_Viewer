const rp = require("request-promise-native");

const getBooruData = (query, pageCount) => {
    const limit = Number(pageCount) * 5;
    let uri = `https://www.sakugabooru.com/post.json?limit=${limit}`;
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