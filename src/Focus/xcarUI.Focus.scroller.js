/* 
effectObjЧ�����������������
�ӿڣ�
	init �Խ���ͼ��ʼ��ʹ�ã�����focusItems��ļ���
	exec ����Ч����Ч����Ե�ǰ��������index����ֵ��focusItems���	
===========================================================================
	���scroller ����Ч��
*/
var Focus=xcarUI.Focus;
Focus.Effects.add("scroller",{
	isExeced:false,
	width:500,
	height:200,
	root:"focus_view",
	direct:'left',
	scroller:null,
	init:function(arr){
		var that=this;
		var root=Focus.$(that.root);
		var len=arr.length;
		var scroller=arr[0].parentNode;
		Focus.each(arr,function(i){
			Focus.setCssObj(arr[i],{
				'width':that.width,
				'height':that.height
			})
		})
		Focus.setCssObj(scroller,{
			'position':'absolute',
			'display':'block',
			'width':that.width*len,
			'height':that.height
		})
		that.scroller=scroller;
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
			index==0?arr.length:index;						
			that.isExeced=true;
			Focus.anim(that.scroller,{"left":-that.width*index},500,function(){
				that.isExeced=false;
			});
			
			
		}		
	}
})