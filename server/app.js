const request = require("request");

const getBooruData = () => {
    request
    .get({
        uri: "https://www.sakugabooru.com/post.json?limit=10",
        json: true
        }, 
        (error, response, body) => {
        const animeData = body.map((m) => {
            const dataItem = {
                author: m.author,
                file_url: m.file_url,
                preview_url: m.preview_url,
                sample_url: m.sample_url,
                jpeg_url: m.jpeg_url,
                tags: m.tags
            }
    
            return dataItem;
        });    
        console.log(animeData);
    });
}

getBooruData();
