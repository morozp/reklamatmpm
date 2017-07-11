
const preUrl = '/ads';
export default {
    getAll: () => {
        return fetch(preUrl, { method: 'get', cache: 'no-cache' }).then((response) => {
            console.log(response);

            return Promise.resolve(response);
        })
    },

    get: (advId) => {
        return fetch(`${preUrl}/${advId}`, { method: 'get', cache: 'no-cache' }).then((response) => {
            console.log(response);

            return Promise.resolve(response);
        })
    },

    add: (newAdv) => {
        const body = JSON.stringify(newAdv);
        return fetch(
            `${preUrl}/0`,
            { method: 'post', body: body, cache: 'no-cache' }
        ).then((response) => {
            console.log(response);
            return Promise.resolve(response);
        });
    },

    update: (adv) => {
        const body = JSON.stringify(newAdv);
        return fetch(
            `${preUrl}/${advId}`,
            { method: 'put', body: body, cache: 'no-cache' }
        ).then((response) => {
            console.log(response);
            return Promise.resolve(response);
        });
    },

    delete: (advId) => {
        const body = JSON.stringify({ advId: advId });
        return fetch(
            `${preUrl}/${advId}`,
            { method: 'delete', body: body, cache: 'no-cache' }
        ).then((response) => {
            console.log(response);
            return Promise.resolve(response);
        });
    }
};
