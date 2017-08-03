const router = require('express').Router();
const advService = require('../../../services/advs').init();

router.route('/:itemId')
	.get((req,resp)=>
		resp.send('ping')
	)
    .put((req, resp) => {
		var x = advService.updateByAdmin(req.body)
		.then((advModel)=>{
            resp.json(advModel && advModel.toJSON());
        }).catch((err)=>{
            // todo
            resp.send(err)
        });
    })
    .post((req, resp) => {
       advService
        .addByAdmin(req.body)
        .then((advModel)=>{
            resp.json( advModel.toJSON());
        }).catch(()=>{
            // todo
            resp.end()
        });
    })

module.exports = router;
