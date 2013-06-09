//效果管理，单例实现。
var Effects=(function(){
	var effects={};
	//添加默认方法
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
	
	return{//返回 效果类管理方法
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
	此焦点图代码用于示例，完成基本的演示功能，对于其它附加功能，在这里不与提供。
	代码未经过全面的测试，如有需要使用者请自行修改并测试。

	js代码：
	"_"：为私有属性，方法
	
*/
	
//构造函数
function Focus(options){
	this._focusItems=options.items||[];//焦点项为数组
	this._callBackFn=options.callBackFn||function(){};//回调函数每次变化后调用
	this._effect=Focus.Effects.get(options.effect||"def");//效果函数，用于焦点切换时的效果
	this.autoPlay=options.autoPlay||true;
	this._speed=options.speed||3000;
	
	this._currentIndex=0;//当前的焦点索引
	this._interval=null;		
	this.init();
}
Tools.mix(Focus,Tools);
Tools.mix(Focus,{'Effects':Effects});
//原型对象
Tools.mix(Focus.prototype,{
	constructor:Focus,//指明构造函数
	init:function(){
		this._effect.init(this._focusItems);
		if(this.autoPlay){
			this.play();
		}
	},
	addFousItem:function(obj){//添加焦点项 public
		if(!obj)return;
		if(typeof obj==="string"){
			obj=document.getElementById(obj);	
		}
		this._focusItem.push(obj);	
	},setEffect:function(name){
		this._effectFn=Focus.Effects.get(name);
	},
	size:function(){//返回当前焦点项总长度
		return this._focusItems.length;	
	},
	_check:function(num){//检查边界
		return num<this.size()&&num>=0;	
	},
	getCurrentIndex:function(){//返回当前索引
		return this._currentIndex;	
	},
	setIndex:function(num){//num 在边界内则设置
		if(this._check(num)){
			this._currentIndex=num;
		}
	},
	goto:function(num){//设置到达的焦点项
		this.setIndex(num);
		this._effect.exec(this._currentIndex,this._focusItems);
		this._callBackFn&&this._callBackFn.call(this,this._currentIndex,this._focusItems);			
	},
	prev:function(){//下一焦点项
		var curIndex=this.getCurrentIndex();
		curIndex--;
		if(!this._check(curIndex)){
			curIndex=this.size();				
			curIndex--;
		}
		
		this.goto(curIndex);
	},
	next:function(){//上一焦点项
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