define(['text!./market.html','css!./market.css'],function(html){
    function render(){
      $('#page').html(html);
      getData();
//    save();
    }

    //ajax
    function getData(){
		$.ajax({
				type:"get",
				url:"http://www.vrserver.applinzi.com/aixianfeng/apicategory.php",
				async:true,
				data:{
					category:"热销榜",
				},
				success:function(req){
					var strH = "";
					var req = JSON.parse(req);
					$.each(req["data"],function(i,elem){
						strH+="<div><dl><dt><img src='"+elem.img+"' class='product_img'/></dt>";
						strH+="<dd class='product_name'>"+elem.name+"</dd>";
						strH+="<dd><img src='images/bg4.jpg'/><span>"+elem.pm_desc+"</span></dd>";
						strH+="<p>"+elem.specifics+"</p>";
						strH+="<p><span class='product_price'>￥"+elem.price+"</span><del>￥"+elem.market_price+"</del></p></dl>";
						strH+="<a href='javascript:;'><img src='images/cart_bg2.jpg' class='super_left'/></a><span class='super_span'>0</span>";
						strH+="<a href='javascript:;'><img src='images/cart_bg3.jpg' class='super_right'/></a></div>";
					})
					$(".super").html(strH);
					//点击加号实现出现减号按钮，并且数量增加
					$.each($(".super_right"),function(i,elem){
						$(elem).click(function(){
							$(".super_left").eq(i).css("display","block");
							$(".super_span").eq(i).css("display","block");
							var num = $(this).parent().prev().html();
							num++;
							$(this).parent().prev().html(num);
							var Pname = $(".product_name").eq(i).html();
							var Psrc = $(".product_img").eq(i).attr("src");
							var Pprice = $(".product_price").eq(i).html();
							save(Pname,Psrc,Pprice,num);
							readStorage();
						})
					})
					//当减号出现的时候，点击减号实现商品数量减少，商品为0，减号消失，数量消失
					$.each($(".super_left"),function(i,elem){
						$(elem).click(function(){
							var num = $(this).parent().next().html();
							num--;
							if(num == 0){
								$(".super_left").eq(i).css("display","none");
								$(".super_span").eq(i).css("display","none");
								var Pname = $(".product_name").eq(i).html();
								var Psrc = $(".product_img").eq(i).attr("src");
								var Pprice = $(".product_price").eq(i).html();
								save(Pname,Psrc,Pprice,num);
								readStorage();
							}else{
								$(this).parent().next().html(num);
							}
							
						})
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
    	console.log(localStorage);
    }
    readStorage();

    function bindEvent(){

    }

    function swiper(){
      
    }

    return {
      render:render
    }
})