const express = require('express');
const dbMiddleware = require('../../../db/db-middleware');
const fileStoreConnection = require('../../../db/connection-init').fileStorage;
const router = express.Router();
const imageService  = require('../../../services/image').init();

router.use('/image',dbMiddleware(fileStoreConnection));
router.route('/image')	
	.post( (req , resp)=>{
		console.log('image/post')
		if (!req.files){
			resp.status(400).send('No files were uploaded.');
			return ;
		}

		imageService.uploadImage(req.files.uploadImage.data ,req.files.uploadImage.mimetype).then((res)=>{
			resp.send(res);
		}).catch((err)=>{
			resp.send(err.toString());
		});
		//resp.send('123123');
	})
	.get((req,resp)=>{
		console.log('image/get')
		if(!req.query.itemId){
			resp.status(400).send('File not found.');
		}
		else{
			imageService.loadImage(req.query.itemId)
			.then((res)=>{
				resp.set('Content-Type', res.mimetype);
				resp.contentType = res.mimetype; 
				resp.send(res.data);
			})
			.catch((err)=>{
				resp.send(err);
			})
		}
	})

module.exports  = router;
