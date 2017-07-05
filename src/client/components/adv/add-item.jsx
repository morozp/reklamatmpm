import React from 'react';

import {
	NamedHandledInput,
	NamedHandledSelect,
	NamedHandledTextArea,
} from './../common/form/inputs';

const servicesOptions = [
	{ value: 'sale', name: 'Продам' },
	{ value: 'exchange', name: 'Обменяю' },
	{ value: 'service', name: 'Предоставлю услугу' },
	{ value: 'buy', name: 'Куплю' },
	{ value: 'gift', name: 'Подарю' },
];

const categoriesOptions = [
	{ value: 'all', name: 'Все объявления' },
	{ value: 'realty', name: 'недвижимость' },
	{ value: 'auto', name: 'авто' },
	{ value: 'product', name: 'товары' },
	{ value: 'service', name: 'услуги' },
	{ value: 'other', name: 'прочее' },
];

const regionsOptions = [
	{ value: 'lb', name: 'Lb' },
	{ value: 'mr', name: 'MR' },
	{ value: 'bn', name: 'BN' },
	{ value: 'dz', name: 'DZ' },
	{ value: 'ag', name: 'AG' },
	{ value: 'all', name: 'All' }
];

const propsT = {
	id: 1,
	images: [1, 2, 3, 4],
	category: 'auto',
	service: 'for-sale',
	place: ['all'],
	description: 'asdk asdkl as dkla skldakls dklas dklakls dklask ad',
	publishTime: '12/02/88  12:16:10',
	viewCount: 879,
	fields: [
		{ name: 'Ady', value: 'BMW F10' },
		{ name: 'Ýeri', value: 'Ashgabat ' },
		{ name: 'Ady', value: 'BMW F10' },
		{ name: 'Ady', value: 'BMW F10' },
		{ name: 'Ady', value: 'BMW F10' },
	]
}

const namedHandledFieldProps = (name, value, onChange, base = {}) => {
	return Object.assign(base, { name, value, onChange });
}

const typed = (type, base) => {
	return Object.assign(base, { type });
}

const typedNamedHandledFieldProps = (name, value, onChange, type) => {
	return namedHandledFieldProps(name, value, onChange, typed(type));
}

export class AddItemForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: "",
			service: "",
			place: "",
			price: "",
			images: [],
			description: "",
		};

		this.handleChangeByName = this.handleChangeByName.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeByName(event) {
		const name = event.target.name;
		if (name) {
			const value = event.target.value;
			this.setState({ [name]: value });
			console.log(this.state);
		}
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	render() {
		return (
			<form>
				<div className='adv-add-item'>
					<div className='place'>
						<NamedHandledSelect
							name='place'
							handleChangeByName={this.handleChangeByName}
							value={this.state.place}
							nameValueOptions={regionsOptions}
						/>
					</div>
					<div className='category'>
						<NamedHandledSelect
							name='category'
							handleChangeByName={this.handleChangeByName}
							value={this.state.category}
							nameValueOptions={categoriesOptions}
						/>
					</div>
					<div className='service'>
						<NamedHandledSelect
							name='service'
							handleChangeByName={this.handleChangeByName}
							value={this.state.service}
							nameValueOptions={servicesOptions}
						/>
					</div>

					<div className='images'>
						<div className='upload-btn'>
							<button />
						</div>
						<div className='uploaded-images'>
							<image src='#'
								width='100px'
								height='100px'
							/>
						</div>
					</div>

					<div className='price'>
						<input
							value={this.state.price}
							onChange={this.handleChangeByName}
							name='price'
						/>
					</div>

					<div className='description-fields'>
						<textarea
							value={this.state.description}
							onChange={this.handleChangeByName}
							name='description'
						/>
					</div>

					<div className='controls'>
						<button>Удалить</button>
						<button>Редактировать</button>
						<button type='submit'>Опубликовать</button>
					</div>

				</div>
			</form>
		);
	}
};
