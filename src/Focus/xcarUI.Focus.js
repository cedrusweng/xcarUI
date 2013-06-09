//Ч����������ʵ�֡�
var Effects=(function(){
	var effects={};
	//���Ĭ�Ϸ���
	effects["def"]={			
			init:function(arr){
				Focus.each(arr,function(i){
					Focus.setCss(arr[i],'display','none');						
				})
				Focus.setCss(arr[0],'display','');
			},
			exec:function(index,arr){
				var that=this;	
				Focus.each(arr,function(i){
					Focus.setCss(arr[i],'display','none');			
				})
				arr[index].style.display="";				
			}
	}
	
	return{//���� Ч���������
		add:function(name,effectObj){
			effects[name]=effectObj;	
		},
		get:function(name){
			if(!name||!(name in effects)){
				return effects["def"];
			}
			return effects[name];	
		},
		del:function(name){
			delete effects[name];	
		}
	}
})()
	
/*
	�˽���ͼ��������ʾ������ɻ�������ʾ���ܣ������������ӹ��ܣ������ﲻ���ṩ��
	����δ����ȫ��Ĳ��ԣ�������Ҫʹ�����������޸Ĳ����ԡ�

	js���룺
	"_"��Ϊ˽�����ԣ�����
	
*/
	
//���캯��
function Focus(options){
	this._focusItems=options.items||[];//������Ϊ����
	this._callBackFn=options.callBackFn||function(){};//�ص�����ÿ�α仯�����
	this._effect=Focus.Effects.get(options.effect||"def");//Ч�����������ڽ����л�ʱ��Ч��
	this.autoPlay=options.autoPlay||true;
	this._speed=options.speed||3000;
	
	this._currentIndex=0;//��ǰ�Ľ�������
	this._interval=null;		
	this.init();
}
Tools.mix(Focus,Tools);
Tools.mix(Focus,{'Effects':Effects});
//ԭ�Ͷ���
Tools.mix(Focus.prototype,{
	constructor:Focus,//ָ�����캯��
	init:function(){
		this._effect.init(this._focusItems);
		if(this.autoPlay){
			this.play();
		}
	},
	addFousItem:function(obj){//��ӽ����� public
		if(!obj)return;
		if(typeof obj==="string"){
			obj=document.getElementById(obj);	
		}
		this._focusItem.push(obj);	
	},setEffect:function(name){
		this._effectFn=Focus.Effects.get(name);
	},
	size:function(){//���ص�ǰ�������ܳ���
		return this._focusItems.length;	
	},
	_check:function(num){//���߽�
		return num<this.size()&&num>=0;	
	},
	getCurrentIndex:function(){//���ص�ǰ����
		return this._currentIndex;	
	},
	setIndex:function(num){//num �ڱ߽���������
		if(this._check(num)){
			this._currentIndex=num;
		}
	},
	goto:function(num){//���õ���Ľ�����
		this.setIndex(num);
		this._effect.exec(this._currentIndex,this._focusItems);
		this._callBackFn&&this._callBackFn.call(this,this._currentIndex,this._focusItems);			
	},
	prev:function(){//��һ������
		var curIndex=this.getCurrentIndex();
		curIndex--;
		if(!this._check(curIndex)){
			curIndex=this.size();				
			curIndex--;
		}
		
		this.goto(curIndex);
	},
	next:function(){//��һ������
		var curIndex=this.getCurrentIndex();
		curIndex++;			
		if(!this._check(curIndex)){				
			curIndex=0;
		}
		this.goto(curIndex);	
	},
	play:function(){
		var that=this;
		that._interval=	setInterval(function(){that.next()},that._speed)
	},
	stop:function(){
		this._interval&&clearInterval(this._interval)		
	}
		
})