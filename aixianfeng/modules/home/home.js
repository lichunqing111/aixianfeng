define(['text!./home.html','swiper','css!./home.css'],function(html){
    function render(){
      $('#page').html(html);
      getData();
      swiper();
    }

    //ajax
    function getData(){
			$.ajax({
				type:"get",
				url:"http://www.vrserver.applinzi.com/aixianfeng/apihome.php",
				async:true,
				success:function(req){
					var strH = "";
					var req = JSON.parse(req);
					$.each(req["data"]["menu"],function(i,elem){
						
						strH+="<dl><dt><a href='javascript:;'><img src='"+elem["activity"].img+"'/></a></dt>";
						strH+="<dd><a href='javascript:;'>"+elem["activity"].name+"</a></dd></dl>";
					})
					$("#main").html(strH);
					$("#main dl").eq(1).find('a').attr({href:"#crazy"});
				}
			})
			
			
			
			$.ajax({
				type:"get",
				url:"http://www.vrserver.applinzi.com/aixianfeng/apihomehot.php",
				async:true,
				success:function(req){
					var strH = "";
					var req = JSON.parse(req);
					$.each(req["data"],function(i,elem){
						strH+="<dl><dt><a href=''><img src='"+elem.img+"'/></a></dt><dd>"+elem.name+"</dd>";
						strH+="<dd><img src='images/bg4.jpg'/><span>"+elem.pm_desc+"</span></dd>";
						strH+="<div class='bar'><p>"+elem.specifics+"</p><p>￥"+elem.price+"<del>￥"+elem.market_price+"</del></p>";
						strH+="<a href='javascript:;'><span></span></a></div></dl>"

					})
					$(".fruit_bottom").html(strH);
				}
			})
    }

    function bindEvent(){
		$()
    }

    function swiper(){
    	$.ajax({
				type:"get",
				url:"http://www.vrserver.applinzi.com/aixianfeng/apihome.php",
				async:true,
				success:function(req){
					var strH = "";
					var req = JSON.parse(req);
					$.each(req["data"]["slide"],function(i,elem){
						strH+="<div class='swiper-slide'><img src='"+elem["activity"].img+"'/></div>";
					})
					$(".swiper-wrapper").html(strH);
					var mySwiper = new Swiper ('.swiper-container', {
						autoplay: 2000,
    					direction: 'horizontal',
    					loop: true,
    				})
				}
			})
      	
    }

    return {
      render:render
    }
})