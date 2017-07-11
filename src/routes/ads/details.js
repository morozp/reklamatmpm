const router = require('express').Router();
const advsService = require('../../services/advs').init();

router.route('/:itemId')
    .get((req, resp) => {
        const itemId = req.params.itemId;
        const adv = advsService.get(itemId);
        resp.json(adv);
    })
    .put((req, resp) => {
        resp.json({ msg: 'put' });
    })
    .post((req, resp) => {
        resp.json({ msg: 'post' });
    })
    .delete((req, res) => {
        resp.send('try delete');
    });

module.exports = router;
