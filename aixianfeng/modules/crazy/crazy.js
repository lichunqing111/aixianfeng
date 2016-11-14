define(['text!./crazy.html','css!./crazy.css'],function(html){
    function render(){
      $('#page').html(html);
      getData();
    }

    //ajax
    function getData(){
		$.ajax({
				type:"get",
				url:"http://www.vrserver.applinzi.com/aixianfeng/apimiaosha.php",
				async:true,
				success:function(req){
					var strH = "";
					var req = JSON.parse(req);
					$.each(req["product"],function(i,elem){
						strH+="<dl><dt><img src='"+elem.img+"'/></dt>";
						strH+="<dd>"+elem.name+"</dd>";
						strH+="<p><span>￥"+elem.price+"</span>原价：￥"+elem.market_price+"</p>";
						strH+="<a href=''>"+elem.btnText+"</a></dl>";
					})
					$("#product").html(strH);
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