const {	
	categories,
	regions,
	services,	
} = require('../../../common/enums/adv');

const {
	orderTypes,
} = require('../../../common/enums/order');

const mainFilterGet  = (request)=>{
	const body  = request.body;

	const {
		search = '',
		region = regions.all,
		category = categories.all,
		service = services.all,
		orderType = orderTypes.newest,
		itemsPerPage = 20,
		pageIndex = 0,
	} = body;

	
	return {
		search,
		region,
		category,
		service,
		orderType,
		pageIndex,
		itemsPerPage,
	}
}

module.exports = {
	mainFilterGet,
}
