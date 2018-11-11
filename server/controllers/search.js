const express = require("express");
const router = express.Router();

const {getBooruData} = require("../services/search.svc.js");

router.get('/', (req, res) => {
    getBooruData()
        .then((response) => {
            res.send(response);
        });
});

router.get('/:searchQuery', (req, res) => {
    const searchQuery = req.params.searchQuery;
    getBooruData(searchQuery)
        .then((response) => {
            res.send(response);
        });
});

module.exports = router;