/**
	������
		xcarUI.js
		xcarUI.Tools.js
	
	Ч�������ŵ�ͼƬ�ϣ�ͼƬ�����Ҳ���ʾ��Ӧλ�õķŴ�ͼ��
	�������Ч�����������£�
	1��Ҫ�õ������Сͼ�����λ�ã���ͼƬ�����Ͻ�Ϊ��0��0����
	2���õ���ͼ�ĵ�ַ�����õ�Сͼ�ʹ�ͼ֮��ĳ����
	3��������ȷ����ǰ���λ�ã���Ӧ�Ĵ�ͼλ�ã�������Ϊ���ĵ㡣
	
	��������
	  {
		  zoom:Ҫʹ�ô�ͼ����Ķ���
		  left:���������ͼ�����Ͻǵ���λ��,
		  top:���������ͼ�����Ͻǵ���λ��,
		  previewBox:���������ͼ�Ŀ�,
		  bigImgSrc:��ͼ��ַ
	  }

	ʹ�÷���һ��
		ֱ�����ɺ�����ͼ��ͬ��С�������������ͼ�Ҳࡣ
	
	html���룺
		<img src="images/1.jpg" id="zoom_thumbnail" data-big='images/1.jpg' width="200" style="cursor:move;" />
	js���룺
		var zoom=new xcarUI.Zoom({zoom:xcarUI.$('zoom_thumbnail')});
===========================================================================

	ʹ�÷�������
		�����Զ���������
	html���룺
		<img src="images/3.jpg" id="zoom_thumbnail2" data-big='images/3b.jpg' width="350" style="cursor:pointer;" />
		<div id="previewBox" class="previewBox"></div>
	js���룺
		var zoom=new xcarUI.Zoom({
								 zoom:xcarUI.$('zoom_thumbnai2'),
								 previewBox:xcarUI.$('previewBox')
								 })
===========================================================================

	ʹ�÷�������
		�����Զ��������ͼ��λ��
	html���룺
		<img src="images/3.jpg" id="zoom_thumbnail2" data-big='images/3b.jpg' width="350" style="cursor:pointer;" />		
	js���룺
		var zoom=new xcarUI.Zoom({
								 zoom:xcarUI.$('zoom_thumbnai1'),
								 left:100,
								 top:100
								 })
	
*/
(function($){
	function Zoom(opts){
		this.zoom=opts.zoom;
		this._hasZoom=false;
		this._imgOriginPoint=[];
		this._mouseRelativePoint=[];
		this._wRange=1;
		this._hRange=1;
		this.left=parseInt(opts.left,10)||0;
		this.top=parseInt(opts.top,10)||0;
		this.previewBox=opts.previewBox;
		this.bigImgSrc=opts.bigImgSrc||this.zoom.getAttribute('data-big')||this.zoom.getAttribute('src');
		this.init();
	}
	Zoom.prototype={
		constructor:Zoom,
		init:function(){
			var that=this;
			if(that.previewBox)that.previewBox.style.display='none';
			$.addEvent(that.zoom,'mouseover',function(e){
					that.attach(e)
			})
			$.addEvent(that.zoom,'mousemove',function(e){
					that.move(e)
			})
			$.addEvent(that.zoom,'mouseout',function(e){
					that.detach(e)
			})
		},
		createViewImg:function(bigImgSrc){
			var that=this,
				bigImg=new Image,
				zoomOffset=$.offset(that.zoom);		
			bigImg.src=bigImgSrc;
			that._wRange=bigImg.width/zoomOffset.width;			
			that._hRange=bigImg.height/zoomOffset.height;
			that._imgOriginPoint[0]=zoomOffset.left;
			that._imgOriginPoint[1]=zoomOffset.top;
			if(!that.previewBox){
				that.previewBox=$.createEl('div');
				document.body.appendChild(that.previewBox);					
				$.setCssObj(that.previewBox,{
							width:zoomOffset.width,
							height:zoomOffset.height,
							overflow:'hidden',
							position:'absolute',
							left:(that._imgOriginPoint[0]+zoomOffset.width)+that.left,
							top:that._imgOriginPoint[1]+that.top
							})
			}else{
				$.setCssObj(that.previewBox,{
							display:'block',
							overflow:'hidden',
							position:'absolute',
							left:(that._imgOriginPoint[0]+zoomOffset.width)+that.left,
							top:that._imgOriginPoint[1]+that.top
				})
			}
			that.previewBox.appendChild(bigImg);
		},
		move:function(e){
			var that=this,
				previewBox=that.previewBox,
				e=e||window.event,
				eLeft=e.clientX,
				eTop=e.clientY;
			if(!previewBox)return;
			var scrollTop=Math.max(document.body.scrollTop,document.documentElement.scrollTop);
			that._mouseRelativePoint[0]=(eLeft-that._imgOriginPoint[0]);
			that._mouseRelativePoint[1]=(eTop-(that._imgOriginPoint[1]-scrollTop));
			var relativeLeft=that._mouseRelativePoint[0]*that._wRange-$.offset(previewBox).width/2;//������Ϊ���ĵ�
			var relativeTop =that._mouseRelativePoint[1]*that._hRange-$.offset(previewBox).height/2;//������Ϊ���ĵ�
			previewBox.scrollLeft=relativeLeft
			previewBox.scrollTop=relativeTop;
		},
		attach:function(e){
			var that=this;
			if(that._hasZoom){
				that.previewBox.style.display='block';
				return;
			}
			that._hasZoom=true;
			that._imgOriginPoint[0]=that.zoom.offsetLeft;
			that._imgOriginPoint[1]=that.offsetTop;	
			that.createViewImg(that.bigImgSrc);
		},
		detach:function(e){
			this.previewBox.style.display='none';					
		}
	}
	$.mix(xcarUI,{'Zoom':Zoom})
})(xcarUI)