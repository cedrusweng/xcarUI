/* 
effectObjЧ�����������������
�ӿڣ�
	init �Խ���ͼ��ʼ��ʹ�ã�����focusItems��ļ���
	exec ����Ч����Ч����Ե�ǰ��������index����ֵ��focusItems���	
===========================================================================
	���crossFade ��������Ч��
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
