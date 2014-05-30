(function($){
	// 用于导航滑块的效果
	var slideNav=$.SlideNav=function(opts){
		this.defaultOption={
			navItems:[],
			slideId:'slide_box',
			ev:'click',
			currentClass:'current',
			startIndex:0,
			callFn:function(){}
		}
		this.defaultOption=$.extend({},this.defaultOption,opts);
		this.opts=this.defaultOption;
		this.init();
	}
	slideNav.prototype={	
		constructor:slideNav,
		init:function(){
			var that=this;		
			that.slideBox=$(that.opts.slideId);		
			$.each(that.opts.navItems,function(idx){
				$(this).bind(that.opts.ev,function(){
					 that.move(that.slideBox,idx);
				})
			});
			that.move(that.slideBox,that.opts.startIndex);
		},
		getItem:function(i){
			return this.opts.navItems[i]||null;	
		},
		addCurrent:function(i){
			var that=this;
			$(this).addClass(that.opts.currentClass).siblings().removeClass(that.opts.currentClass);
			
		},
		move:function(slideBox,idx){
			var that=this;
			var navItem=that.getItem(idx);
			that.addCurrent(idx);
			var targetLeft=$(navItem).offset().left;
			var targetWidth=$(navItem).width();
			$(slideBox).amimate({'left':targetLeft,'width':targetWidth},100,function(){
				that.opts.callFn(idx);															 
			});	
		}
	}
})(jQuery)
