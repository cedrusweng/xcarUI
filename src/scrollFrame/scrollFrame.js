/**
	���ߣ�FE-��ѩ��
	ʱ�䣺2013-11-14
	�汾��v 1.0
	���ܣ�ʵ����ֱ������Ӧ��ִ�ж�����
	���캯�� constructor:
		scrollFrame:function
 		@param frameArray �������� Ĭ��Ϊ[],
			������ JSON����Ϊ
			{yPos:'',//Yλ��
			 initFn:'',//��ʼ������
			 playFn:''//λ�ô�������
			 }
		@param context �������� Ĭ��ֵΪwindow
	ԭ�Ͷ��� proto:
		_init: ��ʼ��
		_getScrollTop:��ȡ��ǰtopֵ
		_addEvent:�¼���
		getFrameYPos:��ȡ��Ӧ��Yλ������
		frameExec: ִ�ж�Ӧ�Ķ�������
		addFrame: ����֡����
		playList������ִ�����ж���
		enable��Ӧ��Ч�� a
*/

function scrollFrame(opts){
	this._locked=[];
	this.frameArray=opts&&opts.frameArray||[];
	this.context=opts&&opts.context||window;
	this._cache=[];
	this._init();
}
scrollFrame.prototype={
	constructor:scrollFrame,
	_init:function(){
		var i=0,len=this.frameArray.length;
		if(len<1)return;
		for(;i<len;i++){
			this.frameExec(i,'initFn');
		}	
	},
	_getScrollTop:function(){
		return this.context.scrollTop|| 
				document.body.scrollTop|| //��׼
				document.documentElement.scrollTop;//IE	
	},
	_getFrameToggle:function(idx){
		return this.frameArray[idx]['toggle']	
	},
	_addEvent:function(fn){
		if(this.context.addEventListener){
			this.context.addEventListener('scroll',fn,false);	
		}else if(this.context.attachEvent){
			this.context.attachEvent('onscroll',fn);
		}else{
			this.context["onscroll"]=fn;	
		}
	},
	addFrame:function(frameObj){
		this.frameArray.push(frameObj);
		this._init();
	},
	getFrameYPos:function(idx){
		return this.frameArray[idx]['yPos'];
	},
	frameExec:function(idx,key){
		this.frameArray[idx][key]&&this.frameArray[idx][key]();
	},	
	playList:function(){		
		if(this.frameArray.length<1)return;
		var top=this._getScrollTop(),
			i=0,
			len=this.frameArray.length;
		for(;i<len;i++){
			if(this.getFrameYPos(i)&&top>this.getFrameYPos(i)){
				if(!this._locked[i]){
					this._locked[i]=true;
					this.frameExec(i,'playFn');	
				}			
			}else{
				if(this._locked[i]){
					this._locked[i]=false;
					this.frameExec(i,'initFn');	
				}				
			}
			
		}
	},
	enable:function(){
		var that=this;
		this._addEvent(function(){
			that.playList.call(that);
		});
		
	}
}

/* ʾ��
	//�������鼯�嶨��
	var frameArray=[
		{	yPos:100,
			playFn:function(){
				$(".c1_flv").stop(true,true).animate({top:126},100);
			},
			initFn:function(){
				$(".c1_flv").stop(true,true).animate({top:800},100);			
			}
		},
		{	yPos:800,
			initFn:function(){
				$(".c1_car").animate({left:-1200,top:868},200);
			},
			playFn:function(){
				$(".c1_car").animate({left:-243,top:828},300);
			}
		},
		{	yPos:1800,
			initFn:function(){
				$(".c3_temp").hide();
			},
			playFn:function(){
				$(".c3_temp").each(function(i){
					var top=$(this).css('top');
					$(this).show().css({'top':-800}).stop(true,true).animate({'top':top},i*100)	
				});
			}
		}			
	]
	//��ʼ��
	var scrFrame=new scrollFrame({'frameArray':frameArray});	
	//����
	scrFrame.enable();
	//���ӵ�֡����
	scrFrame.addFrame({
		yPos:1300,
		initFn:function(){
			$(".c2_title").hide();	
		},
		playFn:function(){
			$(".c2_title").fadeIn();		
		}
	})
	scrFrame.addFrame({
		yPos:2300,
		initFn:function(){
			$("#featured-area").css({"top":500,"opacity":0});			
		},
		playFn:function(){
			$("#featured-area").stop(true,true).animate({"top":80,"opacity":1});		
		}
	})
 */