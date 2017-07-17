import React from 'react';

export const ImageUploader = () => (<div>
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
</div>);