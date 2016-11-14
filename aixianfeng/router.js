define(['backbone'],function(){
  
  var Router = Backbone.Router.extend({

      routes: {
        "home": "homeFn",
        "market": "marketFn",
        "order": "orderFn",
        "cart": "cartFn",
        "mine": "mineFn",
        "crazy":"crazyFn",
        "history":"historyFn",
        "integral":"integralFn",
        "moon":"moonFn",
        "indent":"indentFn",
        "*actions":'defaultAction'
      },

      homeFn: function() {
          require(['./modules/home/home.js'],function(home){
            home.render();
          })
      },
      marketFn: function() {
        require(['./modules/market/market.js'],function(market){
          market.render();
        })
      },
      orderFn: function() {
				require(['./modules/order/order.js'],function(order){
          order.render();
        })
      },
      cartFn: function() {
				require(['./modules/cart/cart.js'],function(cart){
          cart.render();
        })
      },
      mineFn: function() {
				require(['./modules/mine/mine.js'],function(mine){
          mine.render();
        })
      },
      crazyFn: function() {
				require(['./modules/crazy/crazy.js'],function(crazy){
          crazy.render();
        })
      },
      historyFn: function() {
				require(['./modules/history/history.js'],function(history){
          history.render();
        })
      },
      integralFn: function() {
				require(['./modules/integral/integral.js'],function(integral){
          integral.render();
        })
      },
      moonFn: function() {
				require(['./modules/moon/moon.js'],function(moon){
          moon.render();
        })
      },
      indentFn: function() {
				require(['./modules/indent/indent.js'],function(indent){
          indent.render();
        })
      },
      defaultAction:function(){
        location.hash = 'home'
      }

  });

  var router = new Router();
})