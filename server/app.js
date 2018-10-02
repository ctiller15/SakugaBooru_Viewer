const rp = require("request-promise-native");

const getBooruData = () => {
    return rp.get({
        uri: "https://www.sakugabooru.com/post.json?limit=10",
        json: true
        });
}

getBooruData()
    .then((response) => {
        console.log("I did it!!!");
        console.log(response);
    });
