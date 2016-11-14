define(['text!./order.html','css!./order.css'],function(html){
    function render(){
      $('#page').html(html);
      getData();
    }

    //ajax
    function getData(){
		$.ajax({
				type:"get",
				url:"http://www.vrserver.applinzi.com/aixianfeng/apiyuding.php",
				async:true,
				success:function(req){
					var strH = "";
					strH+="<div class='selection'><p>精选水果</p></div>";
					var req = JSON.parse(req);
					$.each(req["product"],function(i,elem){
						strH+="<dl><dt><a href=''><img src='"+elem.img+"'/></a></dt>";
						strH+="<dd>"+elem.name+"</dd>";
						strH+="<p>￥"+elem.price+"<del>"+elem.market_price+"</del></p><a href=''><img src='images/reverse3.jpg'/></a></dl>";
					})
					$("#reserve_main").html(strH);
				}
			})
    }

    function bindEvent(){

    }

    function swiper(){
      
    }

    return {
      render:render
    }
})