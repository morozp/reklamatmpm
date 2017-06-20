const express = require('express');
const advsService = require('../../services/advs').init();


var router = express.Router();

router.get('/', (req, res) => {
    const advs = advsService.getAll();
    res.json(advs);
    /*res.render('advs/list', {
        advs,
    })*/
});

module.exports = router;