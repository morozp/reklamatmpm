import React from 'react';

import {
	NamedHandledInput,
	NamedHandledSelect,
	NamedHandledTextArea,
} from './../common/form/inputs';
import {AdvWrapper} from './../common/adv-wrapper';
import {
	Label
} from './../common/label';
import {
	Pending
} from './../common/pending';
import {
	ValidationError
} from './../common/form/validation-line';
import { 
	addNewItem,
	deleteItem,
} from '../../controllers/adv-item';

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
			validationErrors: {},
			isPending: false,
		};

		this.handleChangeByName = this.handleChangeByName.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.isValid = this.isValid.bind(this);
	}


	handleChangeByName(event) {
		const name = event.target.name;
		if (name) {
			const value = event.target.value;
			this.setState(
				{ [name]: value },
				() => {
					this.validate()
				}
			);
		}

		this.validate();
	}

	handleSubmit(event) {
		event.preventDefault();
		this.validate()
		.then(() => {
			if (this.isValid()) {
				this.setState({ isPending: true })
				addNewItem(this.state)
				.then((result) =>{
					this.setState({ isPending: false });
				})
				
			}
		});
	}

	handleDelete(event) {
		event.preventDefault();
		alert('Вы уверены что хотите удалить?');
	}

	validate() {
		const minDescriptionCount = 20;
		const state = this.state;
		const errors = {};
		if (!state.price) {
			errors.price = 'Пожалуйста введите цену';
		}

		if (!state.description) {
			errors.description = 'Пожалуйста напишите текст объявления';
		} else if (state.description.length < minDescriptionCount) {
			errors.description = `Текст объявления должен быть не менее ${minDescriptionCount} символов`;
		}

		return new Promise(
			(resolve) => {
				this.setState({ validationErrors: errors }, () => {
					resolve();
				});
			}
		);
	}

	isValid() {
		let result = true;
		const validationErrors = this.state.validationErrors;
		for (var prop in validationErrors) {
			if (validationErrors.hasOwnProperty(prop)) {
				result = false;
				break;
			}
		}
		return result;
	}

	render() {
		const validationErrors = this.state.validationErrors;
		const isValid = this.isValid();

		return (
			
			<form>
				<Pending isPending={this.state.isPending}>
				</Pending>
				<div className='adv-add-item form-group'>
					<div className='place form-group' >
						<label htmlFor='place'>Местоположение:</label>
						<NamedHandledSelect
							id='place'
							className='form-control'
							name='place'
							handleChangeByName={this.handleChangeByName}
							value={this.state.place}
							nameValueOptions={regionsOptions}
						/>
					</div>

					<div className='category form-group'>
						<label htmlFor='category'>Категория:</label>
						<NamedHandledSelect
							id='category'
							name='category'
							className='form-control'
							handleChangeByName={this.handleChangeByName}
							value={this.state.category}
							nameValueOptions={categoriesOptions}
						/>
					</div>

					<div className='service form-group'>
						<label htmlFor='service'>Хочу:</label>
						<NamedHandledSelect
							name='service'
							className='form-control'
							handleChangeByName={this.handleChangeByName}
							value={this.state.service}
							nameValueOptions={servicesOptions}
						/>
					</div>

					<div className='images form-group'>
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
					</div>

					<div className='price form-group'>
						<label htmlFor='price'>
							Цена
							</label>
						<input
							id='price'
							className='form-control'
							value={this.state.price}
							onChange={this.handleChangeByName}
							name='price'
						/>
						<ValidationError error={validationErrors.price} />
					</div>

					<div className='description-fields form-group'>
						<NamedHandledTextArea
							id='description'
							className='form-control text-muted'
							value={this.state.description}
							handleChangeByName={this.handleChangeByName}
							name='description'
							placeholder='Напишите текст объявления...'
						/>
						<ValidationError error={validationErrors.description} />
					</div>

					<div className='controls'>
						<button
							className='btn btn-default btn-lg btn-block'
						>
							Удалить
							</button>
						<button
							disabled={!isValid}
							className='btn btn-default btn-lg btn-block'
							type='submit'>Редактировать</button>
						<button
							disabled={!isValid}
							className='btn btn-primary btn-lg btn-block'
							type='submit'
							onClick={this.handleSubmit}>Опубликовать</button>
					</div>
				</div>

			</form>
		);
	}
};
