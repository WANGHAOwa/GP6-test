define([
	"jquery"
],function(){
	$.ajax({
	type:"get",
	url:"JSON/goods.json",
	success:function(res){//res是请求来的JSON对象
		//console.log(res);
		res.data.list.forEach(function(item,index){//data.list是json数组
			renderPage(item);//请求成功后调用渲染页面的函数
		})
	}		
});
	function renderPage(item){//渲染页面
		var data = `<li class="goods_first">
						<img src="${item.image}"/>
						<span><a class="goods_first_price">￥${item.price}</a>
							<a class="goods_first_like"><img src="img/1.png"/>${item.itemLikes}</a>
						</span>
						<input class="goods_first_logo" type="text" value="优选"/>
						<a class="goods_first_logo_text">${item.title}</a>
					</li>`
		var ul = $(".goods_list")
		ul.append(data);		
	}	
})



