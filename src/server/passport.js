const {
	facebook,
	vk,
} = require('../common/config');
var passport = require('passport');
var AuthLocalStrategy = require('passport-local').Strategy;
var AuthFacebookStrategy = require('passport-facebook').Strategy;
var AuthVKStrategy = require('passport-vkontakte').Strategy;

const userService  = require('./services/users').init();

passport.use('local', new AuthLocalStrategy(
	function (username, password, done) {

		if (username == "admin" && password == "admin") {
			return done(null, {
				username: "admin",
				photoUrl: "url_to_avatar",
				profileUrl: "url_to_profile"
			});
		}

		return done(null, false, {
			message: 'Неверный логин или пароль'
		});
	}
));

const facebookUserBeforeSerialize =  (user)=>{
	return {id:user._id.toString(), name:user.facebook.name};
};
passport.use('facebook', new AuthFacebookStrategy({
	clientID: facebook.id,
	clientSecret: facebook.secret,
	callbackURL: facebook.callBackUrl,
	profileFields:  [
		'id',
		'photos',
		'name',
		'displayName',
		'gender',
		'profileUrl',
		'email'
	]
},
function (accessToken, refreshToken, profile, done) {
		console.log("facebook auth: ", profile);

		userService.getByFacebookId(profile.id)
		.then((user)=>{
			if(user){
				return done(null , facebookUserBeforeSerialize(user))
			}
			else 
			{
				 return userService
					 .createByFacebook(profile, accessToken)
					 .then((newUser)=>{
						return done(null, facebookUserBeforeSerialize(user));
					 })
			}	
		}).catch((err)=>{
			console.log(err);
			if(err){
				throw err
			}
		})
	}
));

/*passport.use('vk', new AuthVKStrategy({
	clientID: vk.id,
	clientSecret: vk.secret,
	callbackURL: 'pmtest' + vk.callBackUrl
},
	function (accessToken, refreshToken, profile, done) {

		//console.log("facebook auth: ", profile);

		return done(null, {
			username: profile.displayName,
			photoUrl: profile.photos[0].value,
			profileUrl: profile.profileUrl
		});
	}
));
*/
passport.serializeUser(function (user, done) {
	done(null, JSON.stringify(user));
});


passport.deserializeUser(function (data, done) {
	try {
		done(null, JSON.parse(data));
	} catch (e) {
		done(err)
	}
});

module.exports = function () {
};
