const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number },
    imageUrl: { type: String },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
});

module.exports = mongoose.model('Product', productSchema);
