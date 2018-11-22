const express = require("express");
const router = express.Router();
const cacheSvc = require("../middleware/cache");

router.use(cacheSvc(300));

const {getBooruData} = require("../services/search.svc.js");

router.get('/:searchQuery?/:resultPageCount', (req, res) => {
    const searchQuery = req.params.searchQuery || "";
    const pageCount = Number(req.params.resultPageCount) || 10
    getBooruData(searchQuery, pageCount)
        .then((response) => {
            let binnedData = [];
            const resData = response.map((m) => {
                                m.videoActive = false;
                                m.videoTags = m.tags.split(" ");
                                return m;
                            });
            
            for(let i = 0; i < resData.length; i+=pageCount){
                console.log(resData.length);
                console.log(i);
                console.log(pageCount);
                if(i === 0){
                    binnedData.push(resData.slice(0,pageCount));
                } else{
                    binnedData.push(resData.slice(i, i + pageCount));
                }
            }
            res.send(binnedData);
        });
});

module.exports = router;