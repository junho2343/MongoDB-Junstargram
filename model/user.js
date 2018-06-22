const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	id			: String,
	pw			: String,
	name		: String,
	address		: String,
	phone		: String,
	reg_date 	: {	type: Date, default: Date.now	}
});

module.exports = mongoose.model('user',userSchema);