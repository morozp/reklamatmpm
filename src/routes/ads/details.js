const router = require('express').Router();
const advsService = require('../../services/advs').init();

router.get('/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const adv = advsService.get(itemId);
    res.send(adv);
}).put((req, res) => {
    req.send('try put');

}).post((req, res) => {
    req.send('try post');
}).delete((req, res) => {
    
});

module.exports = router;
