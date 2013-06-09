/* 
effectObj效果对象包含两个方法
接口：
	init 对焦点图初始化使用，传入focusItems项的集合
	exec 运行效果，效果针对当前项，传入参数index索引值，focusItems项集合	
===========================================================================
	添加crossFade 渐隐渐现效果
*/
var Focus=xcarUI.Focus;
Focus.Effects.add("crossFade",{
	isExeced:false,
	init:function(arr){
		Focus.each(arr,function(i){
			Focus.setCss(arr[i],'display','none');							
		})
		Focus.setCss(arr[0],'display','');
	},
	exec:function(index,arr){
		var that=this;					
		if(!that.isExeced){
			Focus.each(arr,function(i){
				Focus.setCss(arr[i],'display','none');						
			})
			Focus.setCssObj(arr[index],{'display':'','opacity':'0'})
			that.isExeced=true;
			Focus.anim(arr[index],{"opacity":1},500,function(){
				that.isExeced=false;
			});
		}		
	}
})
