(function(X){
	//»¬¿éÐ§¹û
	var slideNav=X.SlideNav=function(opts){
		this.defaultOption={
			navItems:[],
			slideId:'slide_box',
			ev:'click',
			currentClass:'current',
			startIndex:0,
			callFn:function(){}
		}
		X.mix(this.defaultOption,opts);
		this.opts=this.defaultOption;
		this.init();
	}
	X.mix(slideNav.prototype,{	
		constructor:slideNav,
		init:function(){
			var that=this;		
			that.slideBox=X.$(that.opts.slideId);		
			X.each(that.opts.navItems,function(idx){
				var navItem=that.getItem(idx);
				X.addEvent(navItem,that.opts.ev,function(){
					 that.move(that.slideBox,idx);
				})
			});
			that.move(that.slideBox,that.opts.startIndex);
		},
		getItem:function(i){
			return this.opts.navItems[i]||null;	
		},
		addCurrent:function(i){
			var that=this,navItem=that.getItem(i),items=that.opts.navItems;
			X.each(items,function(idx){
				items[idx].className=''									   
			})
			navItem.className=that.opts.currentClass;
			
		},
		move:function(slideBox,idx){
			var that=this;
			var navItem=that.getItem(idx);
			that.addCurrent(idx);
			var targetLeft=navItem.offsetLeft;
			var targetWidth=navItem.offsetWidth;
			X.debug(that.getItem(idx));
			X.anim(slideBox,{'left':targetLeft,'width':targetWidth},100,function(){
				that.opts.callFn(idx);															 
			});	
		}
	})
})(xcarUI)