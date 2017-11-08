var passport = require('passport');
const router = require('express').Router();
const config = require('./../../common/config');
const userService = require('../services/users').init();

router.get('/auth/info', function (req, res) {
	if(req && req.user){
		var user  =  userService.getByUserId(req.user.id);
		return 
	}
});


router.get('/sign-out', function (req, res) {
	req.logout();
	res.redirect('/');
});

router.post(
	'/auth',
	passport.authenticate(
		'local',
		{
			successRedirect: '/',
			failureRedirect: '/auth',
			failureFlash: true
		},
		(res, req) => {

		}
	)
);

router.get('/auth/fb',
	passport.authenticate('facebook', {
		scope: 'public_profile'
	})
);

router.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/fail'
	}));

router.get('/auth/vk',
	passport.authenticate('vk', {
		scope: ['friends']
	}),
	function (req, res) {
		// The request will be redirected to vk.com 
		// for authentication, so
		// this function will not be called.
	});

router.get('/auth/vk/callback',
	passport.authenticate('vk', {
		failureRedirect: '/auth'
	}),
	function (req, res) {
		// Successful authentication
		//, redirect home.
		res.redirect('/');
	});

router.get('/auth/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/auth/success', (req,res)=>{
	res.send({auth:'success'});
})

router.get('/auth/fail', (req,res)=>{
	res.send({auth:'fail'});
})

module.exports = router;