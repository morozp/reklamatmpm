const express = require('express');
const advsService = require('../../../services/advs').init();
const {
    mainFilterGet,
} = require('../../../services/models/filter');


var router = express.Router();

router.all('/', (req, resp) => {
    const filter = mainFilterGet(req);
    const advs = advsService
        .getByFilter(filter)
        .then((models)=>{
            resp.json(models.map(adv=>adv.toJSON({ virtuals: true })));
        }).catch((error)=>{
            // todo
            resp.end(error)
        });
});

module.exports = router;