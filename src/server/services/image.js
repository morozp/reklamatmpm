const ImgModel = require('../db/models/images');

class ImageService {
    loadImage(imageId) {
        return ImgModel.findById(imageId)
            .exec()
            .then((res) => {
                console.log(res.id);
                return { mimetype: res.mimetype, data: res.data };
            }).catch((err) => {
                console.log(err);
            });
    }

    uploadImage(data, mimetype) {
        var img = new ImgModel(
            {
                createDate: Date.now(),
                data,
                mimetype: mimetype,
            }
        );
        return img.save()
            .then((res) => {
                console.log(res.id);
                return res.id;
            }).catch((err) => {
                console.log(err);
            });
    }

}

module.exports = {
    init: () => (new ImageService())
};