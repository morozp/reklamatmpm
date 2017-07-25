const router = require('express').Router();
const advService = require('../../../services/advs').init();

router.route('/:itemId')
    .get((req, resp) => {
        const itemId = req.params.itemId;
        const adv = advService
        .get(itemId)
        .then((answer)=>{
            resp.json(answer.map(x=>x.toJSON()));
        }).catch(()=>{
            // todo
            resp.end()
        });
    })
    .put((req, resp) => {
        
        resp.json({ msg: 'put' });
    })
    .post((req, resp) => {
       advService
        .add(req)
        .then((answer)=>{
            resp.json(adv && adv[0] && adv[0].toJSON()|| null);
        }).catch(()=>{
            // todo
            resp.end()
        });
    })
    .delete((req, res) => {
        resp.send('try delete');
    });

module.exports = router;
