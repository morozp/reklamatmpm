
const preUrl = '/api/ads';
// const getFormData = (obj) => {
//     var data = new FormData();
//     data.append('json', JSON.stringify(obj));
//     return data;
// };

export default {
    getAll: (filter) => {
        return fetch(
            preUrl,
            {
                method: 'post',
                body: JSON.stringify(filter),
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        )
            .then((resp) => resp.json())
            .then((response) => {
                const list = response
                    && Array.isArray(response)
                    && response.map(
                        (advItem) => {
                            const {
                                id,
                                price,
                                publishDate,
                                props: {
                                    description,
                                    views,
                                    images,
                                }
                            } = advItem;

                            return {
                                id,
                                description,
                                price,
                                publishDate,
                                views,
                                images,
                            };
                        })
                    || [];

                return list;
            });
    },

    get: (advId) => {
        return fetch(`${preUrl}/${advId}`, { method: 'get', cache: 'no-cache' }).then((response) => {
            return Promise.resolve(response);
        });
    },

    add: (newAdv) => {
        //const body = getFormData(newAdv);

        return fetch(
            `${preUrl}/0`,
            {
                method: 'post',
                body: JSON.stringify(newAdv),
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
            return Promise.resolve(response);
        });
    },

    /*update: (newAdv) => {
        const body = getFormData(newAdv);
        return fetch(
            `${preUrl}/${advId}`,
            { method: 'put', body: body, cache: 'no-cache' }
        ).then((response) => {
            return Promise.resolve(response);
        });
    },*/

    delete: (advId) => {
        const body = JSON.stringify({ advId: advId });
        return fetch(
            `${preUrl}/${advId}`,
            { method: 'delete', body: body, cache: 'no-cache' }
        ).then((response) => {
            return Promise.resolve(response);
        });
    }
};
