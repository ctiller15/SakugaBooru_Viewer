const express = require("express");
const router = express.Router();
const cacheSvc = require("../middleware/cache");

router.use(cacheSvc(300));

const {getBooruData} = require("../services/search.svc.js");

router.get('/:searchQuery?', (req, res) => {
    const searchQuery = req.params.searchQuery || "";
    getBooruData(searchQuery)
        .then((response) => {
            let binnedData = [];
            const resData = response.map((m) => {
                                m.videoActive = false;
                                m.videoTags = m.tags.split(" ");
                                return m;
                            });
            
            for(let i = 0; i < resData.length; i+=10){
                if(i === 0){
                    binnedData.push(resData.slice(0,10));
                } else{
                    binnedData.push(resData.slice(i, i + 10));
                }
            }
            res.send(binnedData);
        });
});

module.exports = router;