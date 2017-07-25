var mongoose = require('mongoose');
const db = require('../db/models/index'); 
class AdvService {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return db.Adv.find(
            (err,res)=>{
            console.log(err);
        });
    }
    get(advId) {
        return db.Adv.find({_id:advId}, (err)=>{
            console.log(err);
        });
    }
    add(newAdv) {
        //todo
        const adv = new db.Adv({
            createDate: Date.now(),
	        editDate: Date.now(),
	        publishDate: null,
	        isDeleted: false,
	        isPublished : false,
	        creatorId : null,
	        publisherId : null,
        })
        
        return adv.save((err, product , numAffected)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(product);
            }
        });
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
