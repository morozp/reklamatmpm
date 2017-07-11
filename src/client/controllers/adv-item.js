import advService from '../api-services/adv';
import result from '../api-services/result';

export const addNewItem = (state) => {
	var data = {
		place: state.place,
		category: state.place,
		service: state.service,
		price: state.price,
		description: state.description,
	}

	return advService
		.add(data)
		.then(() => {
			return Promise.resolve(result.success('Ваше объявление добавлено.'));
		})
}

export const deleteItem = (id) => {
	return advService
		.delete(id)
		.then(() => {
			return Promise.resolve( result.success('Ваше успешно удалено.' ));
		})
}