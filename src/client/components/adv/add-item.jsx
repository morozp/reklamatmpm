import React from 'react';

import {
	NamedHandledInput,
	NamedHandledSelect,
	NamedHandledTextArea,
} from './../common/form/inputs';
import { AdvWrapper } from './../common/adv-wrapper';
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
import {
	ImageUploader
} from './image-uploader';
import { form } from '../common/form/form';
import {
	categories,
	regions,
	services,
} from '../../../common/enums/adv';
import {

} from '../../../common/enums/order'

const servicesOptions = [
	{ value: services.all, name: 'Все объявления' },
	{ value: services.sale, name: 'Продам' },
	{ value: services.exchange, name: 'Обменяю' },
	{ value: services.service, name: 'Предоставлю услугу' },
	{ value: services.buy, name: 'Куплю' },
	{ value: services.gift, name: 'Подарю' },	
];

const categoriesOptions = [
	{ value: categories.all, name: 'Все объявления' },
	{ value: categories.realty, name: 'недвижимость' },
	{ value: categories.auto, name: 'авто' },
	{ value: categories.product, name: 'товары' },
	{ value: categories.service, name: 'услуги' },
	{ value: categories.other, name: 'прочее' },
];

const regionsOptions = [
	{ value: regions.all, name: 'Везде' },
	{ value: regions.lb, name: 'Lb' },
	{ value: regions.mr, name: 'MR' },
	{ value: regions.bn, name: 'BN' },
	{ value: regions.dz, name: 'DZ' },
	{ value: regions.ag, name: 'AG' },	
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

class AddItemFormWrapped extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			handleChangeByName
		} = this.props && this.props.form;

		const {
			place,
			category,
			service,
			price,
			description,
			validationErrors,
		} = this.props && this.props.form && this.props.form.state;


		return (
			<div className='adv-add-item form-group'>
				<div className='place form-group' >
					<label htmlFor='place'>Местоположение:</label>
					<NamedHandledSelect
						id='place'
						className='form-control'
						name='place'
						handleChangeByName={handleChangeByName}
						value={place}
						nameValueOptions={regionsOptions}
					/>
				</div>

				<div className='category form-group'>
					<label htmlFor='category'>Категория:</label>
					<NamedHandledSelect
						id='category'
						name='category'
						className='form-control'
						handleChangeByName={handleChangeByName}
						value={category}
						nameValueOptions={categoriesOptions}
					/>
				</div>

				<div className='service form-group'>
					<label htmlFor='service'>Хочу:</label>
					<NamedHandledSelect
						name='service'
						className='form-control'
						handleChangeByName={handleChangeByName}
						value={service}
						nameValueOptions={servicesOptions}
					/>
				</div>

				<div className='images form-group'>
					<ImageUploader />
				</div>

				<div className='price form-group'>
					<label htmlFor='price'>
						Цена
							</label>
					<input
						id='price'
						className='form-control'
						value={price}
						onChange={handleChangeByName}
						name='price'
					/>
					<ValidationError error={validationErrors.price} />
				</div>

				<div className='description-fields form-group'>
					<NamedHandledTextArea
						id='description'
						className='form-control text-muted'
						value={description}
						handleChangeByName={handleChangeByName}
						name='description'
						placeholder='Напишите текст объявления...'
					/>
					<ValidationError error={validationErrors.description} />
				</div>

				{/*<div className='controls'>
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
					</div>*/}
			</div>
		);
	}
};

export const AddItemForm = form(
	AddItemFormWrapped,
	{
		setInitialState: () => {
			return {
				category: "",
				service: "",
				place: "",
				price: "",
				images: [],
				description: "",
				validationErrors: {},
				isPending: false,
			}
		},
		validate:(formState)=>{
			const minDescriptionCount = 20;
			
			const errors = {};
			if (!formState.price) {
				errors.price = 'Пожалуйста введите цену';
			}

			if (!formState.description) {
				errors.description = 'Пожалуйста напишите текст объявления';
			} else if (formState.description.length < minDescriptionCount) {
				errors.description = `Текст объявления должен быть не менее ${minDescriptionCount} символов`;
			}

			return errors;
		},
		onSubmit:(formState)=>{
			return addNewItem(formState);
		},
		onDelete:(form)=>{
			console.log('delete');
			return Promise.reject();
		}
	})