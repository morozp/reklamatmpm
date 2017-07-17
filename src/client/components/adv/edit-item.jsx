import React from 'react';
import { ImageUploader } from './image-uploader';
import { Pending } from '../common/pending';
import { ValidationError } from '../common/form/validation-line';
import {
	NamedHandledTextArea,
	NamedHandledInput,
} from '../common/form/inputs';
import { form } from '../common/form/form';



class EditItemWrapped extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const isValid = true;
		const formProps =  this.props.form || {};
		const formState = formProps.state || {};
		const {
			handleChangeByName
		} = formProps;

		return (
			
				
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
							value={formState.price}
							onChange={handleChangeByName}
							name='price'
						/>
						{/*<ValidationError error={validationErrors.price} />*/}
					</div>

					<div className='description-fields form-group'>
						<NamedHandledTextArea
							id='description'
							className='form-control text-muted'
							value={formState.description}
							handleChangeByName={handleChangeByName}
							name='description'
							placeholder='Напишите текст объявления...'
						/>
						{/*<ValidationError error={validationErrors.description} />*/}
					</div>
				</div>
		)
	}
}

export const EditItem = form(EditItemWrapped, (form) => {
	return {
		isPending: false,
		price: 0,
		description: '',
	};
})