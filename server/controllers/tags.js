const express = require("express");
const router = express.Router();
const cacheSvc = require("../middleware/cache");

router.use(cacheSvc(86400));

const {getBooruTags} = require("../services/tags.svc.js")

router.get('/:searchQuery', (req, res) => {
    const searchQuery = req.params.searchQuery;
    getBooruTags(searchQuery)
        .then((response) => {
            res.send(response);
        });
});

module.exports = router;