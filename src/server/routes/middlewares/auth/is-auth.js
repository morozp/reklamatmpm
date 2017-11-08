const authorize = (req, res, next) => {
	if (!req.user) {
		res.status(403).end();
	}

	return next();
};

const rolesAuthorize = (roles) => (req, res, next) => {
	if (Array.isArray(roles) && roles.length > 0) {
		if (!req.user
			|| !Array.isArray(req.user.roles)
			|| !req.user.roles.some((usersRole) => roles.some((role) => role === usersRole))) {
			res.status(403).end();
		}
	}

	return next();
};


const permissionsAuthorize = (permissions) => (req, res, next) => {
	if (Array.isArray(permissions) && permissions.length > 0) {
		if (
			!req.user
			|| !Array.isArray(req.user.permissions)
			|| !req.user.permissions.some((usersPermission) => roles.some((permission) => permission === usersPermission))) {
			res.status(403).end();
		}
	}

	return next();
};

module.exports = {
	authorize,
	permissionsAuthorize,
	rolesAuthorize,
};