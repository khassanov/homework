var express = require('express'); // connect express
var logger = require('morgan'); // connect logging module morgan 
var mongoose = require('mongoose');//connect moongose


var app = express();//set variable with name app to express framework

mongoose.connect('mongodb://localhost:27017/shop');//connect to mongodb database from mongoose

var Product = require ('./server/models/product'); // connect model script from models 

// Product.insertMany([
//     {'name': 'Philadelphia', 'description': 'Sea foods', 'category':'sushi','price': 1600},
//     {'name': 'California', 'description': 'Sea foods', 'category':'sushi','price': 1200},
//     {'name': 'Tempura', 'description': 'Sea foods', 'category':'sushi','price': 1450},
//     {'name': 'Bonito Maki', 'description': 'Sea foods', 'category':'sushi','price': 1350},
//     {'name': 'Caesar', 'description': 'Heal food', 'category':'salad','price': 1800},
//     {'name': 'Greek salad', 'description': 'Heal food', 'category':'salad','price': 1650},
//     {'name': 'Spring salad', 'description': 'Heal food', 'category':'salad','price': 600},
//     {'name': 'Carrot salad', 'description': 'Heal food', 'category':'salad','price': 730},
//     {'name': 'Margarita', 'description': 'Fast food', 'category':'pizza','price': 1600},
//     {'name': '4 Seasons', 'description': 'Fast food', 'category':'pizza','price': 1650},
//     {'name': 'Mexican pizza', 'description': 'Fast food', 'category':'pizza','price': 600},
//     {'name': 'Mushroom pizza', 'description': 'Fast food', 'category':'pizza','price': 730},
//     {'name': 'Coca Cola', 'description': 'Water and Drinks', 'category':'drinks','price': 150},
//     {'name': 'Ice Tea', 'description': 'Water and Drinks', 'category':'drinks','price': 170},
//     {'name': 'Beer', 'description': 'Water and Drinks', 'category':'drinks','price': 350},
//     {'name': 'Orange Juice', 'description': 'Water and Drinks', 'category':'drinks','price': 489},
// ]),function(err, Products){
//     console.log(Products);
// };



//Find and Show all elements in collection
// Product.find().exec(function(err, Products){
//     console.log(Products); //always returns array
// });

//Find and Show element by id in collection
// Product.findById('5b1d5c5c5f35737727fbf934').exec(function(err, Products){
//     console.log(Products);
// });

// Product.find({category: 'Second Product'}).exec(function(err,Products){
//     console.log(Products);

//  });

  //DELETE 3 records fropm collection by id 
Product.deleteMany([
    {_id: '5b1d5c5c5f35737727fbf92b'},
    {_id: '5b1d5c5c5f35737727fbf92f'},
    {_id: '5b1d5c5c5f35737727fbf933'},
])
.exec(function(err){
    console.log('Records has been deleted');
});


// //Update
// Product.findById('5b1beb584aeffa2a3ae9370d').exec(function(err, Product){
//     Product.description = "Update desc";
//     Product.save(function(err, Products){
//         console.log('done');
//         console.log(Products);
//     });
   
// });




app.use(logger('dev'));

app.get('/', function(req, res, next){ //root route
    console.log("Here");
    var message = {
        msg: 'Hello',
        age: 21
    }
    res.status(200).send(message);

});

app.get('/hello', function(req, res, next){ //route hello
    console.log("Here2");
    var message = {
        msg: 'Hello Decode',
        age: 21
    }
    res.status(200).send(message);

});

app.listen(process.env.PORT || 3000, function(){
   console.log("Server is a listening on port ", process.env.PORT || 3000) 
});

