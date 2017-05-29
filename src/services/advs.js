const db = require('../db/db');

class AdvService {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return this.db.advs;
    }
    get(advId) {
        return this.db.advs.find((adv) => adv.id === advId);
    }
    add(newAdv) {
        const length = this.db.advs.push(newAdv);
        return this.db.advs[length-1];
    }
    update(adv) {
        let prevIndex = null;
        const prevAdv = this.db.advs.find((adv, index) => {
            prevIndex = index;
            return adv.id === adv.id;
        });
        const updatedAdv = Object.assign(prevAdv, adv);
        this.db.advs[prevIndex] = updatedAdv;
        return updatedAdv;
    }
    delete(advId) {
        let prevIndex = null;
        const prevAdv = this.db.advs.find((adv, index) => {
            prevIndex = index;
            return adv.id === advId
        });
        this.db.advs.splice(prevIndex, 1);
    }
}

module.exports = {
    AdvService,
    init() {
        return new AdvService(db);
    }
};
