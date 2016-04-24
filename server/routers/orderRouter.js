module.exports = function(express) {
	var router = express.Router();
	router.post('/frontend/getOrderSteps', function(req, res) {
		console.log("getOrderSteps");
		res.json({
			status: 'ok',
			result: {
				"msg": "Success"
			}
		});
	});

	return router;
};