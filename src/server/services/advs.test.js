const advService = require('./advs').init();

//testing get all
const notWorkedCorectly = (method) => `${method} not worked correctly`;
const all = advService.getAll();
if (!all) {
    throw Error(notWorkedCorectly('getAll'));
}

const firstItem = all[0];
const itemById = advService.get(firstItem.id);
if (!itemById) {
    throw Error(notWorkedCorectly('get'));
}

const itemForUpdate = Object.assign(itemById, { description: 'UPDATED DEScription' });

const updatedItem = advService.update(itemForUpdate);
if (!updatedItem
    || updatedItem.description == itemById.description
    && updatedItem.description !== itemForUpdate.description) {
    throw Error(notWorkedCorectly('update'));
}
const forAddItem = { id: 'XXXX' };
const advsCountBeforeAdd = all.length;
const added = advService.add(forAddItem);
const advsCountAfterAdd = advService.getAll().length;

if (
    !added
    || added.id !== forAddItem.id
    || advsCountBeforAdd !== advsCountAfterAdd - 1
    )
    {
    throw Error(notWorkedCorectly('add'));
}

advService.delete(added.id);
if (
    advsCountBeforAdd !== advService.getAll().length    
    )
    {
    throw Error(notWorkedCorectly('delete'));
}


