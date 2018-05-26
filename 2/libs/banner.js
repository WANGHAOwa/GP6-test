define(["jquery"],function(){
	;+function($){
		//每次操作单独进行
		$.fn.Mybanner = function(banner_selector,options){
			new banner(banner_selector,options,this);			
		}
		//面向对象
		function banner(banner_selector,options,base_ele){
			this.init(banner_selector,options,base_ele);
		}
		banner.prototype = {
			consotructor:banner,
			init:function(){
				//初始化并添加事件
				this.index = 0;
				this.bannerWrapper = $(banner_selector);
				this.direction = options.direction ? options.direction :'fade';
				this.bannerItem = this.bannerWrapper.children();
				this.bannerNum = this.bannerItem.length;
				this.pagination = $(options.pagination ? options.pagination.el : "");//为换页的可选参数按钮
					//	通过添加移除class名控制当前原点
		            if(this.pagination.length !== 0){
		                for(var i = 0 ; i < this.bannerNum; i++){
		                    var span = $("<span></span>");
		                    this.pagination.append(span);
		                    if(i == this.index){
		                        span.addClass("wh-active");
		                    }
		                }
						//绑定改变下标和动画类型的事件
		                this.paginationItem = this.pagination.children();
		                //proxy改变指针指向
		                this.paginationItem.on("mouseover.changeIndex",{"turn":"toIndex"},$.proxy(this.change_index,this));
		                this.paginationItem.on("mouseover.animation",$.proxy(this.animation,this));
		            }
		            
		            if(typeof options.navigation == "object"){
		            	this.nextBtn = $("#next");
		            	this.prevBtn = $("#prev");
		            	this.nextBtn
		            	.on("click.changIndex",{turn:"next"},$.proxy(this.change_index,this))
		            	.on("click.animations",$.proxy(this.animaton,this))
		            	this.prevBtn
		            	.on("click.changIndex",{turn:"prev"},$.proxy(this.change_index,this))
		            	.on("click.animations",$.proxy(this.animaton,this)) 
		            }
		            if(typeof options.pagination == "object"){
		            	this.paginationEl = $(options.pagination.el)
		            }
				},
				//改变下标 控制图片的显示隐藏
				change_index:function(event){
					var turnList = {
						"prev":function(){
							this.prev = this.index;
							if(this.index == 0){
								this.index = this.bannerNum.length - 1;
							}else{
								this.index --;
							}
						}.bind(this),
						"next":function(){
							this.prev = this.index;
							if(this.index == this.bannerNum.length - 1){
								this.index = 0;
							}else{
								this.index ++;
							}
						}.bind(this),
						"toIndex":function(){
							this.prev = this.index;
							this.index = $(event.target).index();
						}.bind(this)
					}
					if(!(typeof turnList[event.data.turn] == "function")) return 0;
					turnList[event.data.turn]();
				},
				//动画效果
				animation:function(){
					if(this.prev == this.index) return ;
					var animationList = {
						"slide":function(){
							animationList.slideFadeInit();
							this.bannerItem.eq(this.index)
							.addClass("")
							.css({
								display:"none"
							})
							.slideDown();
							.siblings()
							.removeClass("")
						}.bind(this),
						"fade":function(){
							animationList.slideFadeInit();
							this.bannerItem.eq(this.index);
							.addClass("")
							.css({
								display:"none"
							})
							.fadeIn()
							.siblings()
							.removeClass();
						}.bind(this),
						"scroll":function(){
							this.bannerItem
							.css({
								zIndex:0
							})
							.eq(this.prev)
							.css({
								zIndex:2
							})
							.end()
							.eq(this.index)
							.css({
								zIndex:2
							})
						}.bind(this),
						"slideFadeInit":function(){
							this.bannerItem.eq(this.prev)
							.css({
								zIndex:1
							})
							.siblings()
							.css({
								zIndex:""
							})
						}.bind(this),
						"loop":function(){
							timer1=setInterval(function(){
					        $("#next").trigger("click")//自定点击左右两边的按钮进行轮播事件
					   		 },3000)
						    $().hover(function(){//第一个function是鼠标移入的事件,第二个function是鼠标移出的事件
						        clearInterval(timer1)
						    },function(){
						        timer1=setInterval(function(){
						            $().trigger("click")
						        },3000)
						    })
						    $().hover(function(){
						        clearInterval(timer1)
						    }) 					
						}
					}
					animationList[this.direction]();
					this.pagination.children().eq(this.index)
					.addClass("");
					.siblings()
					.removeClass("")
				}	  			
			}	
		})