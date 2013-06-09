/* 
effectObjЧ�����������������
�ӿڣ�
	init �Խ���ͼ��ʼ��ʹ�ã�����focusItems��ļ���
	exec ����Ч����Ч����Ե�ǰ��������index����ֵ��focusItems���	
===========================================================================
	���slider ����Ч��
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