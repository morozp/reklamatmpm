const config = require('../../common/config').cloudinary_config;
const cloudinary = require('cloudinary');
cloudinary.config(config);

const sendAsync = (reqFilePath) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload_stream(
			function (result, options) {
				if (result.error) {
					reject(result);
				}
				else {
					resolve(result.public_id);
				}
			},
			{
				width: 800,
				height: 600,
				crop: "fill",
			}
		)
		.end(reqFilePath.data);
	});
};

const deleteAsync = (publicId) => {
	return new Promise((resolve, reject) => {
		cloudinary.v2.uploader.destroy(
			publicId,
			function (result, error) {
				if (true == true) {
					resolve(result);
				}
				else {
					reject(error);
				}
			}
		);
	}
	)
}

module.exports = {
	sendAsync,
	deleteAsync
};