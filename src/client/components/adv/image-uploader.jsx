import React from 'react';
import { ImageUploaderWrap } from '../common/image-uploader-wrap';

export const ImageUploader = () => (
	<div>
		<div className='upload-btn'>
			<button
				className='btn-block btn btn-primary'
			>
				Загрузить фото
		</button>
		</div>
		<div className='uploaded-images'>
			<image src='#'
				width='100px'
				height='100px'
			/>
		</div>

		<ImageUploaderWrap />
	</div>);