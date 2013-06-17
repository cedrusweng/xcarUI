/**
	依赖：
		xcarUI.js
		xcarUI.Tools.js
	
	效果是鼠标放到图片上，图片会在右侧显示对应位置的放大图。
	完成上面效果，步骤如下：
	1、要得到鼠标在小图的相对位置，以图片的左上角为（0，0）点
	2、得到大图的地址，并得到小图和大图之间的长宽比
	3、运算以确定当前鼠标位置，对应的大图位置，以鼠标点为中心点。
	
	参数对象：
	  {
		  zoom:要使用大图浏览的对象，
		  left:相对于缩略图的右上角的左位移,
		  top:相对于缩略图的右上角的上位移,
		  previewBox:用于浏览大图的框,
		  bigImgSrc:大图地址
	  }

	使用方法一：
		直接生成和缩略图相同大小的浏览框，在缩略图右侧。
	
	html代码：
		<img src="images/1.jpg" id="zoom_thumbnail" data-big='images/1.jpg' width="200" style="cursor:move;" />
	js代码：
		var zoom=new xcarUI.Zoom({zoom:xcarUI.$('zoom_thumbnail')});
===========================================================================

	使用方法二：
		生成自定义的浏览框
	html代码：
		<img src="images/3.jpg" id="zoom_thumbnail2" data-big='images/3b.jpg' width="350" style="cursor:pointer;" />
		<div id="previewBox" class="previewBox"></div>
	js代码：
		var zoom=new xcarUI.Zoom({
								 zoom:xcarUI.$('zoom_thumbnai2'),
								 previewBox:xcarUI.$('previewBox')
								 })
===========================================================================

	使用方法三：
		生成自定义和缩略图的位置
	html代码：
		<img src="images/3.jpg" id="zoom_thumbnail2" data-big='images/3b.jpg' width="350" style="cursor:pointer;" />		
	js代码：
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
			var relativeLeft=that._mouseRelativePoint[0]*that._wRange-$.offset(previewBox).width/2;//以鼠标点为中心点
			var relativeTop =that._mouseRelativePoint[1]*that._hRange-$.offset(previewBox).height/2;//以鼠标点为中心点
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