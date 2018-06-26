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
        search = null,
        region = regions.all,
        category = categories.all,
        service = services.all,
        orderType = orderTypes.newest,
        itemsPerPage = 1,
        pageIndex = 0,
    } = request.body;

    return {
        search,
        region,
        category,
        service,
        orderType,
        pageIndex :  Number(pageIndex),
        itemsPerPage : Number(itemsPerPage),
    };
};

module.exports = {
    mainFilterGet,
};
