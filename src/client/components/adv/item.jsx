import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Spinner from 'react-spinkit';
import { Image, Transformation } from 'cloudinary-react';

const vkLink = 'https://vk.com/reklamatm';
const line = 'https://line.me/R/ti/p/%40reklama.tm';

const getImageUrl = (itemId, imageId) => `/api/image?itemId=${itemId}`;

const imageStatuses = {
	pending: 'pending',
	complete: 'complete',
	error: 'error',
}
class AdvImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: imageStatuses.pending,
		};
	}

	handleImageLoaded() {
		this.setState({ status: imageStatuses.complete });
	}

	handleImageErrored() {
		this.setState({ status: imageStatuses.error });
	}

	render() {
		const { imageId, itemId } = this.props;

		return imageId && (
			<div className={'image-wrapper'}>
				<Image publicId={imageId.toString()}>
					<Transformation width="200" crop="scale" angle="10" />
				</Image>
			</div>
		) || null
	}
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
	let imagesForRender = !!images.length ? [images[0]] : [];
	return (
		<div className='adv-item'>

			{imagesForRender.length && (<div className='images'>
				{imagesForRender.map(
					(imgId) => (
						<AdvImage
							key={imgId}
							imageId={imgId}
							itemId={id}
						/>
					))}
			</div>)
			}

			<div>
				<AdvPrice
					currency={currency}
					price={price}
				/>
				<hr />
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