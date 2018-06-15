angular.module('shop',[]) //connect angular module shop and create controller adminCtrl
.controller('adminCtrl', adminCtrl); 
adminCtrl.$inject = ["$http"];

function adminCtrl($http) {
    var vm = this;

    $http.get('/api/shop').success(function(data){
      
        vm.products = data;
        console.log(data);
        })

    vm.ngname = 'shop';
    
    vm.send = function(){
        console.log(vm.ngname);
    }

    vm.save = function(){
        console.log('Here', vm.name, vm.description, vm.category, vm.price);
        var obj = {
            name: vm.name,
            description: vm.description,
            category: vm.category,
            price: vm.price
        };
        $http.post('api/shop', obj).success(function(data){
            vm.products.push(data);
            console.log(data);
        }) //1 аргумент куда, 2 аргумент что передаем

    }
}