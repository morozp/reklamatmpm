import React from 'react';
import { Link , Route } from 'react-router-dom';

const vkLink = 'https://vk.com/reklamatm';
const line = 'https://line.me/R/ti/p/%40reklama.tm';

const getImageUrl = (itemId, imageId) => `/adv/items/${itemId}/${imageId}.jpg`;

const AdvImage = (props) => {
	const { imageId, itemId } = props;
	const imageUrl = getImageUrl( itemId,imageId);

	return (
		<div className='img-center'>
			<img
				src={imageUrl}
				width='auto'
			/>
		</div>
	)
}

const AdvPrice = (props) => {
	const {
		currency,
		price,
	} = props;

	return (
		<span className='price'>
			<span className='currency'>{currency}</span>
			{' '}
			<span className='price'>{price}</span>
		</span>
	)
}

const AdvDescription = (props) => {
	const {
		description,
	} = props;

	return (
		<div
			className='description'
			dangerouslySetInnerHTML={{ __html: description }}
		/>
	)
}

const Statistics = (props) => {
	const {
		publishDate = '',
		viewsCount = 0,
	} = props;
	return (
		<div className='btn-group btn-group-justified'>
			<div className='form-group'>
				<div className='input-group'>
					<span className='input-group-addon'>{publishDate}</span>
					<span className='input-group-addon'>Просмотров: {viewsCount}</span>
				</div>
			</div>
		</div>)
}

const AdvItem = (props) => {
	const {
		price,
		currency = 'TMT',
		images = [],
		description = '',
		id = null,
		publishDate = '',
		viewsCount = 0,
		isEditable = false,
		match = {},
	} = props;

	return (
		<div className='adv-item'>

			<div className='images'>
				{images.map(
					(imgId) => (
						<AdvImage
							key={imgId}
							imageId={imgId}
							itemId={id}
						/>
					))}
			</div>

			<div>
				<AdvPrice
					currency={currency}
					price={price}
				/>
				<hr/>
			</div>

			<div className='description-fields'>
				<AdvDescription description={description} />
			</div>

			<div className='statistic'>
				<Statistics
					publishDate={publishDate}
					viewsCount={viewsCount}
				/>
			</div>

			<div className='controls'>
				<div className='btn-group btn-group-justified'>
					{isEditable && (<Link to={`/edit/${id}`} className='btn btn-info'>Edit</Link>)}
					<a href={vkLink} className='btn btn-primary'>Vkontakte</a>
					<a href={line} className='btn btn-success'>Line it</a>
				</div>
			</div>
		</div>
	);
}

export default AdvItem;