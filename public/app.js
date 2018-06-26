angular.module('shop', []) //connect angular module shop and create controller adminCtrl
    .controller('adminCtrl', adminCtrl);
adminCtrl.$inject = ["$http"];

function adminCtrl($http) {
    var vm = this;

    $http.get('/api/shop').success(function (data) {

        vm.products = data;
        console.log(data);
    })

    vm.ngname = 'shop';

    vm.send = function () {
        console.log(vm.ngname);
    }


    vm.images = {
        pizza: './images/pizza.svg',
        drinks: './images/drinks.svg',
        salad: './images/salads.svg',
        sushi: './images/sushi.svg'
    };

    vm.getImg = function (img) {
        img = vm.images;
        return vm.img;

    }



    vm.save = function () {
        console.log('Here', vm.name, vm.description, vm.category, vm.price, vm.img);
        var obj = {
            name: vm.name,
            description: vm.description,
            category: vm.category,
            price: vm.price,
            img: vm.img
        };
        $http.post('api/shop', obj).success(function (data) {
            vm.products.push(data);
            console.log(data);
        }) //1 аргумент куда, 2 аргумент что передаем

    }


    vm.deleteGoods = function (delgoods) {

        $http.delete('/api/shop/' + delgoods._id)
            .success(function () {
                var index = vm.products.indexOf(product);
                vm.products.splice(index, 1); //Аргументы: Начиная от индекса, сколько элементов

            })
            .error(function (err) {
                console.log(err.msg);
            })
            
    }

    vm.editModule = false;
    vm.openEditModule = function (updgoods) {
        if (updgoods) {
            vm.editShop = angular.copy(updgoods);
            vm.editModule = true;
        } 
        else{
            vm.editModule = false;
        }

    }
    vm.updateShop = function () {
        console.log('1');
        if (vm.editShop && vm.editShop.name && vm.editShop.name.length!=''&&
        vm.editShop.description && vm.editShop.description.length !=''&& 
        vm.editShop.category && vm.editShop.category.length!= ''&& 
        vm.editShop.price && vm.editShop.price.length!=''&&
         vm.editShop.img && vm.editShop.img.length!='') {

            $http.put('/api/shop', vm.editShop)
                .success(function () {
                    console.log('OK', vm.editShop);
                    vm.editModule = false;
                    var index = vm.findIndexById(vm.editShop._id);
                    console.log(index);
                    vm.products[index] = vm.editShop;

                })
                .error(function (data) {
                    console.log(data.msg);
                })

        }

       

    }
    vm.findIndexById = function (id) {

        for (var i = vm.products.length - 1; i >= 0; i--) {
            if (id == vm.products[i]._id) {
                console.log(id, vm.products[i]);
                return i;

            }
        }
    }
    
}