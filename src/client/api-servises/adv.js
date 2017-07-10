
class advService {
    static preUrl = '/ads';
    static getAll() {
        return fetch(AdvService.preUrl, { method: 'get', cache: 'no-cache' }).then((response) => {
            console.log(response);

            return Promise.resolve(response);
        })
    }

    static get(advId) {
        return fetch(`${AdvService.preUrl}/${advId}`, { method: 'get', cache: 'no-cache' }).then((response) => {
            console.log(response);

            return Promise.resolve(response);
        })
    }

    static add(newAdv) {
        const body = JSON.stringify(newAdv);
        return fetch(
                `${AdvService.preUrl}/${advId}`,
                { method: 'post', body: body, cache: 'no-cache' }
            ).then((response) => {
                console.log(response);
            return Promise.resolve(response);
        });
    }

    static update(adv) {
        const body = JSON.stringify(newAdv);
        return fetch(
                `${AdvService.preUrl}/${advId}`,
                { method: 'put', body: body, cache: 'no-cache' }
            ).then((response) => {
                console.log(response);
            return Promise.resolve(response);
        });
    }

    static delete(advId) {
       const body = JSON.stringify({advId:advId});
        return fetch(
                `${AdvService.preUrl}/${advId}`,
                { method: 'delete', body: body, cache: 'no-cache' }
            ).then((response) => {
                console.log(response);
            return Promise.resolve(response);
        });
    }
}

export default advService;
