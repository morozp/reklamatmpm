const db = require('../db/models/index');
const {
    categories,
    regions,
    services,
} = require('../../common/enums/adv');
const {
 orderTypes,
} = require('../../common/enums/order');


class AdvService {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return db.Adv.find(
            (err, res) => {
                console.log(err);
            });
    }
    getByFilter(filter) {
        let findObject = {};
        let sort = {};
        if (filter.region !== regions.all) {
            findObject.region = filter.region
        }

        if (filter.category !== categories.all) {
            findObject['props.category'] = filter.category
        }

        if (filter.service !== services.all) {
            findObject['props.category'] = filter.service
        }

        if (filter.search) {
            findObject['props.description'] = RegExp(`.*${filter.search}.*`, 'i');;
        }

        if (filter.orderType === orderTypes.newest) {
            sort['publishDate'] = 1;
        }

        if (filter.orderType === orderTypes.priceHighestToLowest) {
            sort['props.price'] = 1;
        }

        if (filter.orderType === orderTypes.priceLowestToHighest) {
            sort['props.price'] = -1;
        }
        if (!filter.itemsPerPage || filter.itemsPerPage > 10) {
            filter.itemsPerPage = 10;
        }
        if (!filter.pageIndex) {
            filter.pageIndex = 0;
        }
        return db.Adv.find(
            findObject,
            null,
            {
                sort,
                skip: filter.itemsPerPage * filter.pageIndex,
                limit: filter.itemsPerPage,
            },
            (err, res) => {
                console.log(err);
            }
        )
            .exec();
    }
    get(advId) {
        return db.Adv.find({ _id: advId }, (err) => {
            console.log(err);
        });
    }
    view(advId) {
        return db.Adv.findById(advId)
            .exec()
            .then((advModel) => {
                if (advModel) {
                    advModel.views = (advModel.views || 0) + 1;
                    return advModel.save();
                }
                return Promise.resolve();
            })
    }
    addByUser(newAdv) {
        //todo
        const adv = new db.Adv({
            createDate: Date.now(),
            editDate: Date.now(),
            isEdited: true,
            publishDate: null,
            isDeleted: false,
            isPublished: false,
            creatorId: null,
            publisherId: null,
            props: {
                description: newAdv.description,
                images: newAdv.images,
                views: 0,
            }
        })

        return adv.save((err, product, numAffected) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(product);
            }
        });
    }
    addByAdmin(adv) {
        const advModel = new db.Adv({
            createDate: Date.now(),
            editDate: Date.now(),
            isEdited: true,
            publishDate: adv.isPublish ? Date.now() : null,
            isDeleted: false,
            isPublished: adv.isPublish,
            publisherId: adv.publisherId,
            props: {
                description: adv.description,
                images: adv.images,
                views: adv.views,
                category: adv.category,
                region: adv.region,
                service: adv.service
            }
        })

        return advModel.save((err, product, numAffected) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(product);
            }
        });
    }
    updateByUser(adv) {
        return db.Adv.update(
            { _id: adv.id },
            {
                'props.description': adv.description,
                'props.images': adv.images,
                editDate: Date.now(),
                isEdited: true,
            }).exec();
    }
    updateByAdmin() {
        let updatedProps = {
            'props.price': adv.description,
            'props.description': adv.description,
            'props.images': adv.images,
            'props.category': adv.category,
            'props.service': adv.service,
            'props.region': adv.description,
            'props.views': adv.views,
            editDate: Date.now(),
            isEdited: true,
        };
        if (adv.isPublish) {
            updatedProps.publishDate = Date.now();
            updatedProps.isPublished = true;
        }
        return db.Adv.update(
            { _id: adv.id }, updatedProps).exec();
    }
    deleteByUser(advId) {
        return db.Adv.findById(advId)
            .exec()
            .then(model => {
                //todo  check if user owner
                if (model && true === true) {
                    return model.remove();
                }
            });
    }
}

module.exports = {
    AdvService,
    init() {
        return new AdvService(db);
    }
};
