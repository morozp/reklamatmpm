const express = require('express');
const router = express.Router();
const imageCloudSerice = require('../../../services/image-cloud');

const imageValidation = {
    maxSize: 10000000,
    maxImageHeight: 800,
    maxImageWidth: 600,	
    allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
};

const MIME_TYPES = {
    GIF :'image/gif',
    JPEG:'image/jpeg',
    PJPEG:'image/pjpeg',
    PNG:'image/png',
    BMP:'image/vnd.wap.wbmp',
};
const validateFile = (file) => {
    let errors = [];
    const mimeType = file.mimetype.toLowerCase();
    if (
        mimeType !== MIME_TYPES.JPEG
		&& mimeType !== MIME_TYPES.PJPEG
		&& mimeType !== MIME_TYPES.GIF
		&& mimeType !== MIME_TYPES.PNG
		&& mimeType !== MIME_TYPES.BMP
    ) {
        errors.push('File type not allowed.');
    }
    if (file.data.byteLength > imageValidation.maxSize) {
        errors.push('File size is too large.');
    }

    return errors.length > 0 ? errors : null;
};

router.route('/image')
    .post((req, resp) => {
        if (!(req.files && req.files.qqfile && req.files.qqfile.data)) {
            resp.status(400).json('No files were uploaded.');
            return;
        }

        const errors = validateFile(req.files.qqfile);
        if (errors) {
            return resp.json(errors);
        }
        imageCloudSerice.sendAsync(req.files.qqfile)
            .then((public_id) => {
                resp.json({ imageId: public_id, success: true });
            }).catch((err) => {
                console.log(err);
                resp.send(err);
            });
    })
    .get((req, resp) => {
        console.log('image/get');
        if (!req.query.itemId) {
            resp.status(400).send('File not found.');
        }
        else {
            /*imageService.loadImage(req.query.itemId)
				.then((res) => {
					resp.set('Content-Type', res.mimetype);
					resp.contentType = res.mimetype;
					resp.send(res.data);
				})
				.catch((err) => {
					resp.send(err);
				})*/
        }
    });

module.exports = router;