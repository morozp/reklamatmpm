import React from 'react';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

export const ImageUploaderWrap = (props)=>(
		<ImagesUploader
			url='test'
			optimisticPreviews
			multiple={false}
			onLoadEnd={
				(err) => {
				if (err) {
						console.error(err);
						}
					}
				}
			label="Upload a picture"
		/>
);