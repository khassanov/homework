var express = require('express'); // connect express
var logger = require('morgan'); // connect logging module morgan 
var mongoose = require('mongoose');//connect moongose
var path = require('path'); 
var bodyParser = require('body-parser');

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

//Find and Show elements by category
// Product.find({category: ['sushi','salad','pizza','drinks']}).exec(function(err,Products){
//     console.log(Products);

//  });

//   DELETE 3 records fropm collection by id 
//   var del_array = ['5b1e561201ef8164cf0921bf', '5b1e561201ef8164cf0921be', '5b1e561201ef8164cf0921bd'];
//   Product.deleteMany({_id: del_array }).exec(function(err){
//     console.log('deleted');
// })


 //Find and Update 
// Product.findById('5b1e561201ef8164cf0921b0').exec(function(err, Product){
//     Product.name = "Super Sushi";
//     Product.save(function(err, Products){
//         console.log('done');
//         console.log(Products);
//     });   
// });
// Product.findById('5b1e561201ef8164cf0921b4').exec(function(err, Product){
//     Product.name = "Ivan Grozny";
//     Product.save(function(err, Products){
//         console.log('done');
//         console.log(Products);
//     });   
// });
// Product.findById('5b1e561201ef8164cf0921b8').exec(function(err, Product){
//     Product.name = "Kazahk pizza";
//     Product.save(function(err, Products){
//         console.log('done');
//         console.log(Products);
//     });   
// });

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb',extended: true}));

app.use(express.static(path.join(__dirname, 'public'), { maxAge :1}));//path to static file


app.use(logger('dev'));

app.get('/', function(req, res, next){ //root route
    console.log("Here");
    var message = {
        msg: 'Hello',
        age: 21
    }
    res.status(200).send(message);

});

app.get('/api/shop', function(req, res, next){ 
    
    Product.find().exec(function(err, product){
        res.status(200).send(product);
    });
});
app.post('/api/shop', function(req,res, next){
    console.log(req.body); 
    new Product ({
        name: req.body.name,
        description :req.body.description,
        category:req.body.category,
        price:req.body.price

    
    }).save(function(err, product){
        res.status (200).send(product);
    })
})
// app.get('/hello', function(req, res, next){ //route hello
//     console.log("Here2");
//     var message = {
//         msg: 'Hello Decode',
//         age: 21
//     }
//     res.status(200).send(message);

// });

app.listen(process.env.PORT || 3000, function(){
   console.log("Server is a listening on port ", process.env.PORT || 3000) 
});

