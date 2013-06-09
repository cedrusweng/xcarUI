/* 
effectObj效果对象包含两个方法
接口：
	init 对焦点图初始化使用，传入focusItems项的集合
	exec 运行效果，效果针对当前项，传入参数index索引值，focusItems项集合	
===========================================================================
	添加slider 滚动效果
*/
var Focus=xcarUI.Focus;
Focus.Effects.add("slider",{
	isExeced:false,
	width:500,
	height:200,
	root:"focus_view",
	direct:'left',
	init:function(arr){
		var that=this;
		var root=Focus.$(that.root);		
		Focus.each(arr,function(i){
			Focus.setCssObj(arr[i],{
				'position':'absolute',
				'left':1000,
				'display':'block',
				'width':that.width,
				'height':that.height
			})
		})
		arr[0].style.left="0";
		Focus.setCssObj(root,{
			'position':'relative',
			'overflow':'hidden',
			'display':'block',
			'width':that.width,
			'height':that.height
		})		
	},
	exec:function(index,arr){
		var that=this;					
		if(!that.isExeced){
			Focus.each(arr,function(i){
				Focus.setCssObj(arr[i],{
					'zIndex':0,
					'display':'none'
				});						
			})
			
			Focus.setCss(arr[(index==0?arr.length:index)-1],'display','');
			Focus.setCssObj(arr[index],{
					'zIndex':5,
					'display':'',
					'left':(that.direct=="left"?1:-1)*that.width
			});				
			that.isExeced=true;
			Focus.anim(arr[index],{"left":0},500,function(){
				that.isExeced=false;
			});
			
			
		}		
	}
})