define(['text!./cart.html','css!./cart.css'],function(html){
    function render(){
//    var Select;
//    var decNum;
//    var addNum;
//    var amount;
//    var total;
//    var list;
//    var arr;
      $('#page').html(html);
      bindEvent();
      createProduct();
    }

    //ajax
    function getData(){
		
    }
	
    function bindEvent(){
	    var selectAll = document.querySelector(".selectAll");
	
	
		//点击全选按钮实现商品全部选中，再次点击所有商品取消选中
		$(selectAll).click(function(){
			if($(this).attr("src")=="images/cart_bg1.jpg"){
				$(this).attr("src","images/bg_cart3.jpg");
				$.each(Select,function(i,elem){
					$(elem).attr("src","images/bg_cart3.jpg");
				})
				
				$(total).html(0);
			}else{
				$(this).attr("src","images/cart_bg1.jpg");
				$.each(Select,function(i,elem){
					$(elem).attr("src","images/cart_bg1.jpg");
				})
				
				$.each(list,function(i,elem){
					var cmount = $(elem).find('p').text();
					var num = $(elem).find("span").html();
					var s =parseFloat(cmount.substring(1,cmount.length)*num).toFixed(2);
					arr[i] = s;//取到每个商品的总价每次添加替换到数组中
					var sum = 0;
					//遍历数组求和
					for(var j = 0;j<arr.length;j++){
						if(arr[j]){
							sum+=Number(arr[j]);
							var t = parseFloat(sum.toFixed(2));
						}
					}
					$(total).html("￥"+t);
					
				})
			}
		})
		
		
    }
    
     function save(Pname,Psrc,Pprice,Pnum){
    	var news = {
    		Pname:Pname,
    		Psrc:Psrc,
    		Pprice:Pprice,
    		Pnum:Pnum
    	}
    	localStorage.setItem(news.Pname,JSON.stringify(news));
    }
     
    function readStorage(){
    	for(var keys in localStorage){
			var news = JSON.parse(localStorage.getItem(keys));
			if(news.Pnum == 0){
				localStorage.removeItem(keys);
			}
		}
//  	console.log(localStorage);
    }
    readStorage();
    
    function createProduct(){
    	
    	var strH = "";
    	for(var keys in localStorage){
			var news = JSON.parse(localStorage.getItem(keys));
			strH+="<div class='list'><a href='javascript:;'><img src='images/bg_cart3.jpg' class='select'/></a>";
	    	strH+="<dl><dt><img src='"+news.Psrc+"'/></dt>";
	    	strH+="<dd>"+news.Pname+"</dd>";
	    	strH+="<p>"+news.Pprice+"</p></dl>";
	    	strH+="<div><a href='javascript:;'><img src='images/cart_bg2.jpg' class='decnum'/></a>";
	    	strH+="<span class='amount'>"+news.Pnum+"</span>";
	    	strH+="<a href='javascript:;'><img src='images/cart_bg3.jpg' class='addnum'/></a></div></div>";
//	    	console.log(news.Pname);
//	    	console.log(news.Psrc);
//	    	console.log(news.Pnum);
//	    	console.log(news.Pprice);
			if(news.Pnum == 0){
				localStorage.removeItem(keys);
			}
		}
    	
    	$(".cart_list").html(strH);
    	//因为商品前面的按钮和加减按钮都是动态获取的，所以要实现他的效果一定以写在动态创建的函数里面，否则数据还没有获取，也就是说还没有创建，是无法实现效果的，没有数据也就没法出现任何的效果
    		Select = document.querySelectorAll(".select");
    		list = document.querySelectorAll(".list");
    		decNum = document.querySelectorAll(".decnum");
			addNum = document.querySelectorAll(".addnum");
			amount = document.querySelectorAll(".amount");
			total = document.querySelector(".total");
			var selectAll = document.querySelector(".selectAll");
			
			var index = 0;
			arr = new Array(list.length);
    		//实现购物车的商品选中状态
    		$.each(Select,function(i,elem){
			$(elem).click(function(){
				if($(this).attr("src")=="images/cart_bg1.jpg"){
					index--;
					//商品取消选中的时候总价格要减去取消选中商品的价格
					$(this).attr("src","images/bg_cart3.jpg");
					arr[i] = 0;//需要把没有选中的商品价格置为0；
					var sum = 0;
					//遍历数组求和
					for(var j = 0;j<arr.length;j++){
						if(arr[j]){
							sum+=Number(arr[j]);
							var t = parseFloat(sum.toFixed(2));
						}
					}
					$(total).html("￥"+t);
				}else{
					$(this).attr("src","images/cart_bg1.jpg");
					index++;
					var cmount = $(this).parent().next().find("p").text();
					var num = $(this).parent().next().next().find("span").html();
					var s =parseFloat(cmount.substring(1,cmount.length)*num).toFixed(2);
					arr[i] = s;//取到每个商品的总价每次添加替换到数组中
					var sum = 0;
					//遍历数组求和
					for(var j = 0;j<arr.length;j++){
						if(arr[j]){
							sum+=Number(arr[j]);
							//保留有效数字
							var t = parseFloat(sum.toFixed(2));
						}
					}
					$(total).html("￥"+t);
				}
				//当所有商品全部选中的时候全选按钮被选中，只要有一个不选中则全选不被选中
				//这里声明了一个index变量，如果为选中则index++;如果没有被选中则index--;最后的数值和商品列表数量比较，等于则全选被选中，不等于则全选不被选中
				if(index!=$(list).length){
					$(selectAll).attr("src","images/bg_cart3.jpg");
				}else{
					$(selectAll).attr("src","images/cart_bg1.jpg");
				}
				//如果没有被选中的商品要把总金额置为0；
				
			})
		})
    		
    	
		

		//实现购物车的商品数量和总额计算
		$.each(decNum,function(i,elem){
			$(elem).click(function(){
				//每次都获取一下对应商品的数量
				var num = $(this).parent().next().html();
				num--;
				if(num == 0){
					//当商品件数为0时移除对应列表
					$(this).parent().parent().parent().css("display","none");
				}else{
					$(this).parent().next().html(num);
					var cmount = $(this).parent().parent().prev().find('p').text();
					var s = (cmount.substring(1,cmount.length)*num).toFixed(2);
					arr[i] = s;//取到每个商品的总价每次添加替换到数组中
					var sum = 0;
					//遍历数组求和
					for(var j = 0;j<arr.length;j++){
						if(arr[j]){
							sum+=Number(arr[j]);
							var t = parseFloat(sum.toFixed(2));
						}
					}
					$(total).html("￥"+t);
				}
				var click_name = $(this).parent().parent().siblings().find('dd').html();
				for(var keys in localStorage){
					var news = JSON.parse(localStorage.getItem(keys));
					if(click_name===news.Pname){
						localStorage.removeItem(keys);
					}
				}
			})
		})
		
		$.each(addNum,function(i,elem){
			
			$(elem).click(function(){
				var num = $(this).parent().prev().html();
				num++;
				$(this).parent().prev().html(num);
				//获取每个商品的单价数值
				var cmount = $(this).parent().parent().prev().find('p').text();
				//cmount.substring(1,cmount.length)表示截取单价中的数值
				
				//算出每种商品总价，加在所有商品总价上 toFixed表示保留两位小数
				var s =parseFloat(cmount.substring(1,cmount.length)*num).toFixed(2);
				arr[i] = s;//取到每个商品的总价每次添加替换到数组中
				var sum = 0;
				//遍历数组求和
				for(var j = 0;j<arr.length;j++){
					if(arr[j]){
						sum+=Number(arr[j]);
						var t = parseFloat(sum.toFixed(2));
					}
				}
				$(total).html("￥"+t);
				
				//如果点击加号没有被选中的商品变为选中状态
				if($(Select).eq(i).attr("src")=="images/bg_cart3.jpg"){
					$(Select).eq(i).attr("src","images/cart_bg1.jpg");
				}
			})
		})
    }
	
	
	
	
	
    function swiper(){
      
    }

    return {
      render:render
    }
})