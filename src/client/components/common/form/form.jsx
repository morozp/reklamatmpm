import React from 'react';
import { Pending } from '../pending';

export const form = (WrappedComponent, config = {}) => {
	return class Form extends React.Component {
		constructor(props) {
			super(props);
			this.config = config;
			this.state = (() => {
				let state = {
					validationErrors: {},
					isPending: false,
				};
				if(config.setInitialState){
					state = Object.assign(state, config.setInitialState(this))
				}

				return state;
			})();

			this.handleChangeByName = this.handleChangeByName.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleDelete = this.handleDelete.bind(this);
			this.isValid = this.isValid.bind(this);
			this.validate = this.validate.bind(this);
			this.getFormApi = this.getFormApi.bind(this);
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
						this.config.onSubmit
							&& this.config.onSubmit(this.state)
								.then((result) => {
									this.setState({ isPending: false });
								})
					}
				});
		}

		handleDelete(event) {
			event.preventDefault();
			if (alert('Вы уверены что хотите удалить?')) {
				this.config.onDelete && this.config.onDelete(this.state);
			}
		}

		validate() {
			const minDescriptionCount = 20;
			const state = this.state;
			let errors = {};

			if (this.config.validate) {
				errors = this.config.validate(this.state);
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

		getFormApi() {
			return {
				state: this.state,
				handleChangeByName: this.handleChangeByName,
				handleSubmit: this.handleSubmit,
				handleDelete: this.handleDelete,
				validate: this.validate,
				isValid: this.isValid,
			}
		}
		render() {
			const isValid = this.isValid();
			const { formClassName } = this.props;

			const formApi = this.getFormApi();

			return (

				<form className={formClassName}>
					<Pending isPending={this.state.isPending} />
					<div className=' form-group'>
						<WrappedComponent
							form={formApi}
							{...this.props}
						/>

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
};