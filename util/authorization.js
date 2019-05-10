module.exports = (roles) => {
	return (req, res, next) => {
		if (!roles || roles.length < 1) {
			next();
		} else if (req.user && req.user.role && roles.includes(req.user.role)){
			next();
		} else if (!req.user) {
			res.status(401).json({
				error: {
					code: "INVALID_TOKEN",
					msg: "The token is invalid",
				}
			});
		} else {
			res.status(403).json({
				error: {
					code: "UNATHORIZED_USER",
					msg: "You haven't the required permission to access to this content",
				}
			})
		}
	};
};