const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	code		: String,
	tag			: Array,
	img			: String,
	reg_date	: { type: Date, default: Date.now }
});

module.exports = mongoose.model('product',productSchema);
