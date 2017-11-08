const db = require('../db/models/index');
const {
    authorizeTypes
} = require('../../common/enums/user');

class UserService {
	constructor(db) {
		this.db = db;
	}

	getAll() {
		return db.User.find(
			(err, res) => {
				console.log(err);
			});
	}

	getByUserId(userId) {
		return db.User.findOne({ _id: userId })
			.then((user)=>{
			return user.toJSON();
		});
	}
	getByFacebookId(facebookId) {
		return db.User.findOne(
			{ 'facebook.id': facebookId },
			{ 
				_id: 1,
				 'facebook.id': 1,
				 'facebook.token': 1,
				 'facebook.displayName': 1,
				 'facebook.photos': 1,
				 'facebook.email': 1 
			}
			)
			.exec()
			.then((user)=>{
				return user.toJSON();
			});
	}

	createByFacebook(profile, token) {
		const nowDate = Date.now();
		const user = new db.User({
			createdDate: nowDate,
			lastLoginDate: nowDate,
			authorizeType: authorizeTypes.facebook,
			facebook: {
				id: profile.id,
				token: token,
				displayName: profile.displayName,
				photos: profile.photos,
				email: profile.email,
			}
		})

		return user.save((err, savedUser, numAffected) => {
			if (err) {
				console.log(err)
			}
			else {
				console.log(savedUser);
			}
		}).then((newUser)=>{
			return newUser.toJSON();
		});
	}
	getByFacebookToken(facebookToken) {
		return db.User.find({ _id: userId }, (err) => {
			console.log(err);
		});
	}

	addUser(newUser) {
		//todo
		const user = new db.User({

		})

		return user.save((err, user, numAffected) => {
			if (err) {
				console.log(err)
			}
			else {
				console.log(user);
			}
		});
	}

	deleteUser(userId) {
		return db.User.findById(userId)
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
	UserService,
	init() {
		return new UserService(db);
	}
};
