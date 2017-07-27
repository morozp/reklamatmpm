const router = require('express').Router();
const advService = require('../../../services/advs').init();
const imageSaver = require('../../../db/models/images');

router.route('/:itemId')
    .get((req, resp) => {
        const itemId = req.params.itemId;
        const adv = advService
        .get(itemId)
        .then((answer)=>{
            resp.json(answer.map(x=>{
                    result  = x.toJSON()
                    result.id = x._id;
                    delete result._id;
                    delete result.__v;
                return result;
             }));
        }).catch(()=>{
            // todo
            resp.end()
        });
    })
    .put((req, resp) => {
        var x = advService.updateByUser(req.body).then((model)=>{
            resp.json(model.ok);
        }).catch((err)=>{
            // todo
            resp.send(err)
        });
    })
    .post((req, resp) => {
       advService
        .addByUser(req.body)
        .then((advModel)=>{
            resp.json( advModel.toJSON());
        }).catch(()=>{
            // todo
            resp.end()
        });
    })
    .delete((req, resp) => {
        advService.deleteByUser(req.params.itemId)
        .then((result)=>{
            resp.json(result);
        }).catch((err)=>{
            console.log(err);
            resp.end()
        });
    });

 router.route('/view/:itemId')
 .post( (req,resp)=>{
     advService.view(req.params.itemId)
     .then((advModel)=>{
         resp.json({
             itemId:advModel.id,
             views :advModel.views
            });
        }
     ).catch((err)=>{
         resp.json(err);
     })

 });

 router.route('/image/:itemId')
 .get((req , resp) =>{
         var img =  new imageSaver(
             { createDate: Date.now() }
         );
        img.save().then((res)=>{
            console.log(res)
            resp.send(res);
        }).catch((err )=>{
            console.log(err);
            resp.send(err);
        })
         
         
 });

module.exports = router;
