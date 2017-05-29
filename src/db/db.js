const faker = require('faker/locale/ru');;
const regions = ['lb', 'mr', 'bn', 'dz', 'ag', 'all'];
const generateUsers = () => {
    const arr = [];
    const length = faker.random.arrayElement([3, 2, 1]);
    for (let i = 0; i < length; i++) {

        arr[i] = {
            id: faker.random.uuid(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            name: faker.name.findName(),
            email: faker.internet.email(),
        };
    }

    return arr;
};

const generateAdvs = (categories) => {

    const arr = [];
    const length = faker.random.arrayElement([31, 56, 21, 10, 44]);
    for (let i = 0; i < length; i++) {
        arr[i] = {
            id: faker.random.uuid(),
            description: faker.lorem.text(),
            price: faker.commerce.price(),
            region: faker.random.arrayElement(regions),
            category: faker.random.arrayElement(categories.map((item) => item.category)),
            createDate: faker.date.past(),
            publishDate: faker.date.recent(),
            deleteDate: faker.date.recent(),
            isDelete: faker.random.boolean(),
        };
    }

    return arr;
};

const generateCategoryies = () => {
    const arr = [];
    const length = faker.random.arrayElement([8, 11, 1]);
    for (let i = 0; i < length; i++) {
        arr[i] = {
            id: faker.random.uuid(),
            category: faker.commerce.department(),
        };
    }

    return arr;
};

const categories = generateCategoryies();
const users = generateUsers();
const advs = generateAdvs(categories);

const db = {
    users,
    categories,
    advs,
}

console.log(db);
module.exports = db;