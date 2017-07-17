import React from 'react';
import { ImageUploader } from './image-uploader';
import { Pending } from '../common/pending';
import { ValidationError } from '../common/form/validation-line';
import {
	NamedHandledTextArea,
	NamedHandledInput,
} from '../common/form/inputs';

export class EditItem extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isPending: false,
			price:0,
			description:'',
		}
	}

	handleChangeByName(){

	}

	render() {
		const isValid = true;
		return (
			<form>
				<Pending isPending={this.state.isPending} />
				<div className='adv-edit-item form-group'>
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
							value={this.state.price}
							onChange={this.handleChangeByName}
							name='price'
						/>
						{/*<ValidationError error={validationErrors.price} />*/}
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
						{/*<ValidationError error={validationErrors.description} />*/}
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
							type='submit'>Сохранить изменения</button>
					</div>
				</div>
			</form>
		)
	}
}