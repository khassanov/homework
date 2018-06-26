var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    name: String,
    description :String,
    category: String,
    price: Number,
    img: String
    
});

module.exports = mongoose.model("Product", productSchema);