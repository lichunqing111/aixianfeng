define(['text!./indent.html','css!./indent.css'],function(html){
    function render(){
      $('#page').html(html);
      bindEvent();
    }

    //ajax
    function getData(){

    }

    function bindEvent(){
		var oLi = document.querySelectorAll(".tar li");
		$.each(oLi,function(i,elem){
			var lastLeft = parseFloat($("nav>span").css("left"));
			$(elem).on("click",function(){
				$("nav span").css("left",lastLeft+18.8*i+"%");
			})
		})
    }

    function swiper(){
      
    }

    return {
      render:render
    }
})