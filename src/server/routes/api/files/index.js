const express = require('express');
const dbMiddleware = require('../../../db/db-middleware');
const fileStoreConnection = require('../../../db/connection-init').fileStorage;
const router = express.Router();
const imageService = require('../../../services/image').init();
const jimp = require('jimp');

const imageValidation = {
	maxSize: 10000000,
	maxImageHeight: 1200,
	maxImageWidth: 800,
	savedMimeType :jimp.MIME_JPEG,
	allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
}


const validateFile  = (file)=>{	
	let  errors = [];
	const mimeType = file.mimetype.toLowerCase();
	if(
		mimeType !== jimp.MIME_JPEG 
		&& mimeType !== jimp.MIME_PNG 
		&& mimeType !== jimp.MIME_BMP
	){
		errors.push('Не известный формат файла.');
	}
	if(file.data.byteLength > imageValidation.maxSize){
		errors.push('Файлы такого размера мы не поддердиваем.');
	}

	return errors.length>0 ? errors : null;
}

router.use('/image', dbMiddleware(fileStoreConnection));
router.route('/image')
	.post((req, resp) => {
		if (!(req.files && req.files.qqfile && req.files.qqfile.data)) {
			resp.status(400).json('No files were uploaded.');
			return;
		}

		const errors = validateFile(req.files.qqfile);
		if(errors){
			return resp.json(errors);
		}
		
		jimp.read(req.files.qqfile.data)
			.then((image) => {
				return image
					.scaleToFit(imageValidation.maxImageWidth, imageValidation.maxImageHeight)
					.getBuffer(jimp.MIME_JPEG,(error, buffer)=>{
						if(error){
							 throw error;
						}
						return buffer;
					});
			})
			.then((buffer) => {
				return imageService.uploadImage(buffer, imageValidation.savedMimeType)
					.then((res) => {
						resp.json({imageId:res, success:true});
					}).catch((err) => {
						resp.send(err);
					});
			})
			.catch((err)=>{
				console.log(err);
				resp.send(err);
			});
	})
	.get((req, resp) => {
		console.log('image/get')
		if (!req.query.itemId) {
			resp.status(400).send('File not found.');
		}
		else {
			imageService.loadImage(req.query.itemId)
				.then((res) => {
					resp.set('Content-Type', res.mimetype);
					resp.contentType = res.mimetype;
					resp.send(res.data);
				})
				.catch((err) => {
					resp.send(err);
				})
		}
	})

module.exports = router;

