angular.module('shoppingApp', ['ngRoute'])
.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
		
		when('/login', {
		templateUrl: 'views/login.html',
		controller: 'loginController',
		controllerAs:'loginCtrl'
		}).
		when('/shopping', {
		templateUrl: 'views/shopping.html',
		controller: 'mainCtrl',
		controllerAs: 'ctrl'
		}).
		when('/cart', {
		templateUrl: 'views/shoppingCart.html',
		controller: 'cartController',
		controllerAs:'cartCtrl'
		}).
		when('/home',{
		templateUrl: 'views/home.html',
		controller: 'mainCtrl',
		controllerAs: 'homectrl'
		}).
		when('/order',{
		templateUrl: 'views/orderPage.html',
		controller: 'orderController',
		controllerAs: 'orderctrl'
		}).
		otherwise({
		redirectTo: '/home'
		});
}])
//shopping page controller
.controller('mainCtrl', ['$http','$location','itemService',function($h,$l,$i) {
var self = this;
self.addToCart=function(item){
$i.save(item);
$l.path('/cart');
};
$h.get("data.json")
  .success(function(response) {self.result = response;});
}])
//login page controller
.controller('loginController', ['$location','itemService',function($l,$i) {
var self = this;
if($l.path() != '/login'){
	$('.header-2 a').text('Logout');
}else $('.header-2 a').text('Login');
self.submit=function(){
$l.path('/shopping');
$('.header-2 a').text('Logout');
};
}])
//shopping cart controller
.controller('cartController', ['$location','itemService',function($l,$i) {
var self = this;
self.itemsInCart=$i.display();
self.cost=$i.getCost();
$i.errmessage();
self.removeFromCart=function(item){
$i.remove(item);
$i.errmessage();
};
}])
.controller('orderController', ['itemService',function($i) {
var self = this;
self.cost=$i.getCost();
self.successmsg=function(){
$('.order-page').html('<h3>Your Order has been placed successfully.</h3>');
}
}])
.controller('mainController', ['itemService',function($i) {
var self = this;
$i.display();
}])
.factory("itemService", function() {
  var items = [];
  var cost;
  return {
	
    save: function(item) {
      items.push(item);
	 
	},
	remove: function(item) {
      items.splice(items.indexOf(item), 1);
	  cost=cost-parseInt(item.itemPrice);
	  $('.orderDetails p span').text(cost+' $');
    },
	display:function(){
		return items;
	},
	errmessage:function(){
		if(items.length == 0){
			$('.cart-item h3').text('No items in cart');
			$('.orderDetails p').html('');
		}
	},
	getCost:function(){
		cost=0;
		if( items.length > 0){
		for(i=0;i < items.length;i++){
			cost=cost+parseInt(items[i].itemPrice);
		}
		$('.orderDetails p span').text(cost+' $');
	    }
	return cost;
	}
  };
});