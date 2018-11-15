const express = require("express");
const router = express.Router();

const {getBooruData} = require("../services/search.svc.js");

router.get('/', (req, res) => {
    getBooruData()
        .then((response) => {
            const resData = response.map((m) => {
                                m.videoActive = false;
                                m.videoTags = m.tags.split(" ");
                                return m;
                            });
            res.send(resData);
        });
});

router.get('/:searchQuery', (req, res) => {
    const searchQuery = req.params.searchQuery;
    getBooruData(searchQuery)
        .then((response) => {
            const resData = response.map((m) => {
                                console.log(m);
                                m.videoActive = false;
                                m.videoTags = m.tags.split(" ");
                                return m;
                            });
            //console.log(resData);
            res.send(resData);
        });
});

module.exports = router;