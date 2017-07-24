const express = require('express');
const advsService = require('../../services/advs').init();


var router = express.Router();

router.get('/', (req, resp) => {
    const advs = advsService
     .getAll()
     .then((answer)=>{
            resp.json(advs);
        }).catch((error)=>{
            // todo
            resp.end(error)
        });
});

module.exports = router;