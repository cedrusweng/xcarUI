(function(X){
	/* 
			���߷���
			��Ҫ��
			anim ��������
			getCss     ��ȡCSS��ʽֵ
			setCss     ����CSS��ʽֵ
			setCssObj  ������ʽ����CSS��ʽֵ
			each       ����������ص���������
			debug      ������
	*/
	X.Tools=(function(undefined){
		var doc=window.document;
		//�򵥷�װ��document.getElementById����
		var $=function(id){
			return doc.getElementById(id);	
		}
		var $$=function(tag,context){
			var tag=tag||'*';
			var context=context||document;
			return context.getElementsByTagName(tag);
		}
		//������ǩ��δʹ��
		var createEl=function(tag){
			return doc.createElement(tag);	
		}
		//��������
		var anim=function(el,attr,time,callFn){
			if(typeof el==="string")el=$(el);
			time=time||800;
			var start=new Date();
			var old={};
			var name;
			for(name in attr){
				old[name]=parseInt(getCss(el,name))||0;		
				
			}
			(function step(){
				var diffTime=(new Date())-start;
				var rate=diffTime/time;
				for(var name in old){
					var val=old[name]+rate*(attr[name]-old[name]);
					if(name=='width'||name=='height'){
						if(val<0){
							val=0;	
						}	
					}
					setCss(el,name,val);
				}
				
				if(rate<1){
					setTimeout(function(){step();},Math.min(20,time-diffTime));
				}else{
					for(names in attr){
						setCss(el,names,attr[names]);
					}
					callFn&&callFn.call(el);
				}
				
			})()
		}
		//δ����IE��͸���Ļ�ȡ����
		function getCss(el,name){
			if(document.defaultView&&document.defaultView.getComputedStyle){
				return document.defaultView.getComputedStyle(el,null)[name];	
			}else if(el.currentStyle){
				return el.currentStyle[name];	
			}
			return 0;
		}
		//δ����IE��͸������������
		var setCss=(function(){
			var	cssNumber={//jQuery���
				"fillOpacity": true,
				"fontWeight": true,
				"lineHeight": true,
				"opacity": true,
				"orphans": true,
				"widows": true,
				"zIndex": true,
				"zoom": true
			}
			var pxs={
				'width':true,
				'height':true,
				'left':true,
				'right':true,
				'top':true,
				'bottom':true,
				'marginLeft':true,
				'marginTop':true			
			}
			return function(el,name,val){
				var units=cssNumber[name]?'':pxs[name]?'px':'';
				if(name==='opacity'){
					el.style.filter='alpha(opacity='+val*100+')';
				}
				el.style[name]=val+units;
			}
		})()
		/*/������Ϊ��ʽ����
			cssObj={
				width:100,
				height:200,
				display:'block'
			}
		*/
		function setCssObj(el,cssObj){
			for(var name in cssObj){
				this.setCss(el,name,cssObj[name]);	
			}	
		}
		//��������
		function each(arr,fn){
			for(var i=0,len=arr.length;i<len;i++){
				fn.call(arr[i],i,arr[i],arr);	
			}
		}
		//������
		function debug(msg){
			//console.log(msg);	
		}
		//ֱ�ӻ�϶���
		function mix(dest,src){
			for(var name in src){
				dest[name]=src[name];	
			}	
		}
		//����¼�
		function addEvent(o,ev,fn){
			if(o.addEventListener){
				addEvent=function(o,ev,fn){
					o.addEventListener(ev,fn,false);	
				}	
			}else if(o.attachEvent){
				addEvent=function(o,ev,fn){
					o.attachEvent('on'+ev,fn);	
				}	
			}else{
				addEvent=function(o,ev,fn){
					o['on'+ev]=fn;
				}	
			}
			addEvent(o,ev,fn);
		}
		
		//��ȡoffetLeft,offsetTop,offsetWidth,offsetHeight
		function offset(obj){
			var left=0,top=0,
				width=obj.offsetWidth||0,
				height=obj.offsetHeight||0;
			while(obj){
				left+=obj.offsetLeft||0;
				top+=obj.offsetTop||0;
				obj=obj.parentNode;
			}
			
			return {
				left:left,
				top:top,
				width:width,
				height:height
			}	
		}
		
		//���ؽӿں���
		return {
			each:each,
			debug:debug,
			mix:mix,			
			$:$,
			$$:$$,
			createEl:createEl,			
			getCss:getCss,
			setCss:setCss,
			setCssObj:setCssObj,
			addEvent:addEvent,
			anim:anim,
			offset:offset
		}
	})()	
	X.Tools.mix(X,X.Tools);
})(xcarUI)
