import React, { Component } from 'react';
import scaleImage from './scale.png';
import closeImage from './close.png';
import maskImage from './stamp.png';
import propsImage from './hetong.png'
import { Button, message } from 'antd';

class EidtImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounder: 7,
      image1: {
        img: undefined,                                    // 保存图片对象
        src: this.props.stampUrl?this.props.stampUrl:maskImage, // 图片路径
        x: 50,                                             // 图片左上角x坐标
        y: 100,                                             // 图片左上角y坐标
        width: 100,                                        // 用来绘制的宽度（注意不是图片自身的宽度，图片会被压缩显示）
        height: 100,                                       // 用来绘制图片的高度
        drag: false,                                       // 是否处于拖拽状态
        scale: false,                                      // 是否处于缩放状态
        scaleDirection: '',                                // 缩放方向
        scaleIcon: scaleImage,
        closeIcon: closeImage,
        selected: true,                                     //拖拽模块是否处于选中转态，true为是
        closeMoudle: false,                                   //true:关闭遮层，false展示遮层
        imageUrl: ''                                          //画布背景图
      },
      imgUrl: '',
      cansText: {},                                        //画布对象
      canva: {},
      stampX:0,
      stampY:0
    }
  }

  componentDidMount = () => {
    this.canvasInit();
  }
  // 画布初始化
  canvasInit = () => {
    let canvasId = this.refs.canvas.id;
    let canva = document.getElementById(canvasId);
    const cansText = canva.getContext("2d");
    console.log('this.props.stampUrl',this.props,'this.props.stampUrl')
    const imageUrl = propsImage;
    this.setState({
      cansText, canva, imageUrl
    }, () => {
      // 加载图片
      this.loadimage();
    })

  }

  //加载
  loadimage = () => {
    const obj = this.state.image1;
    const { cansText, canva, imageUrl } = this.state;
    let that=this;
    let bgImage = new Image();
    bgImage.crossOrigin = "anonymous";//解决图片跨域
    bgImage.src = imageUrl;
    bgImage.onload = function () {
      let bgImageW = bgImage.width;
      let bgImageH = bgImage.height;
      canva.width = 580;
      canva.height = 580 * bgImageH / bgImageW;
      cansText.drawImage(bgImage, 0, 0, 580, 580 * bgImageH / bgImageW);
      if (obj.closeMoudle) return;
      let image = new Image();
      image.crossOrigin = "anonymous";//解决图片跨域
      image.src = obj.src;
      image.onload = function () {
        // that.drawText(cansText,canva);
        cansText.drawImage(image, obj.x, obj.y, obj.width, obj.height);
        obj.image = image;
        if (obj.selected) {
          // 虚线
          cansText.setLineDash([5, 5]);//定义虚线的长度和间隔
          cansText.strokeStyle = "#fff";
          cansText.strokeRect(obj.x, obj.y, obj.width, obj.height);
          //渲染伸缩图标
          let scaleIcon = new Image();
          scaleIcon.crossOrigin = "anonymous";
          scaleIcon.src = obj.scaleIcon;
          scaleIcon.onload = function () {
            cansText.drawImage(scaleIcon, obj.x - 8, obj.y + obj.height - 12, 20, 20);
          }
          // 关闭遮层图标
          let closeIcon = new Image();
          closeIcon.crossOrigin = "anonymous";
          closeIcon.src = obj.closeIcon;
          closeIcon.onload = function () {
            cansText.drawImage(closeIcon, obj.x + obj.width - 10, obj.y - 10, 20, 20)
          }
        }

      }
    }
  }

  // 监听鼠标按下事件
  onmousedown = (e) => {
    if (e) e.persist();
    let that = this;
    let { bounder, image1 } = that.state;
    let mousex = e ? e.nativeEvent.offsetX : 1000;
    let mousey = e ? e.nativeEvent.offsetY : 1000;
    let bottom = image1.y + image1.height;
    let top = image1.y;
    let left = image1.x;
    let right = image1.x + image1.width;


    //判断，是否关闭遮层
    if (right - 10 < mousex && mousex < right + 10 && top - 10 < mousey && mousey < top + 10) {
      image1.closeMoudle = true;
    }


    // 判断，当前拖拽模块是否选中状态
    if (right + 10 < mousex || mousex < left - 10 || bottom + 10 < mousey || mousey < top - 10) {
      image1.selected = false;
    } else {
      image1.selected = true;
    }

    // 判断是缩放还是拖拽，若点击位置和边线的差大于bounder则认为是拖拽，否则是缩放
    if ((left + bounder <= mousex && mousex <= right - bounder) && (top + bounder <= mousey && mousey <= bottom - bounder)) {
      image1.drag = true;
      image1.scale = false;
      image1.scaleDirection = '';
    } else if (0 <= mousex - left && mousex - left <= bounder) {
      image1.scaleDirection = 'left';
      image1.scale = true;
      image1.drag = false;
    } else if (0 <= right - mousex && right - mousex <= bounder) {
      image1.scaleDirection = 'right';
      image1.scale = false;
      image1.drag = true;
    }

    if (0 <= mousey - top && mousey - top <= bounder) {
      image1.scaleDirection += 'top';
      image1.scale = false;
      image1.drag = true;
    } else if (0 <= bottom - mousey && bottom - mousey <= bounder) {
      image1.scaleDirection += 'bottom';
      image1.scale = true;
      image1.drag = false;
    }
    this.loadimage();
  }
  // 鼠标弹起，重置所有事件参数
  onmouseup = (e) => {
    e.persist();
    const { image1 } = this.state;
    // body...
    image1.drag = false;
    image1.scale = false;
    image1.scaleDirection = '';
    this.setState({ image1 });
  }

  // 绘制圆形印章
	drawText=(context,canvas,companyName="大中华区块链科技有限公司")=>{
		
    // 清除画布法一
    context.globalAlpha=1;
    context.fillStyle = '#fff';
    context.fillRect(0,0,150,150);
   var text = "";
   var companyName = companyName;
  
  // 绘制印章边框   
   var width = 480;        //控制公章的X的中心轴位置
   var height =480;      //控制公章的Y的中心轴位置
   context.lineWidth = 5;
   context.strokeStyle = "rgba(240,15,0,0.5)";
   context.beginPath();
   context.arc(width, height, 60, 0, Math.PI * 2);      //宽、高、半径
   context.stroke();

   //画五角星
   this.create5star(context,width,height,10,"rgba(240,15,0,0.1)",0);

    // 绘制印章名称   
    context.font = '6px 宋体';
    context.textBaseline = 'middle';//设置文本的垂直对齐方式
    context.textAlign = 'center'; //设置文本的水平对对齐方式
    context.lineWidth=1;
    context.fillStyle = 'rgba(240,15,0,0.5)';
    context.save();
    context.translate(width,height+60);// 平移到此位置,
    context.scale(1,2);//伸缩要先把远点平移到要写字的位置，然后在绘制文字
    context.fillText(text,0,0);//原点已经移动
    context.restore();

    // 绘制印章单位   
    context.translate(width,height);// 平移到此位置,
    context.font = '8px 宋体'
    var  count = companyName.length;// 字数
    var  angle = 8*Math.PI/(6*(count - 1));// 字间角度   
    var chars = companyName.split("");
    var c;
   for (var i = 0; i < count; i++) {
     c = chars[i];// 需要绘制的字符 
　　　　　　　　　//绕canvas的画布圆心旋转  
     if (i == 0) {
       context.rotate(5 * Math.PI / 6);
     } else{
       context.rotate(angle);
     }
     context.save();
     context.translate(45, 0);// 平移到此位置,此时字和x轴垂直，公司名称和最外圈的距离
     context.rotate(Math.PI / 2);// 旋转90度,让字平行于x轴
     context.scale(1,2);//伸缩画布，实现文字的拉长
     context.fillText(c, 0, 0);// 此点为字的中心点
     context.restore();           
   }
   // 设置画布为最初的位置为原点，旋转回平衡的原位置，用于清除画布
   context.rotate(-Math.PI/6);
   context.translate(0-canvas.width/2,0-canvas.height/2);
   //绘制五角星  
    /** 
   * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上 
   * rotate:绕对称轴旋转rotate弧度 
   */
 //    this.create5star(context, sx, sy, radius, color, rotato);
}
// 绘制五角星
create5star=(context, sx, sy, radius, color, rotato)=>{
 context.save();
 context.fillStyle = color;
 context.translate(sx, sy);//移动坐标原点
 context.rotate(Math.PI + rotato);//旋转
 context.beginPath();//创建路径
 var x = Math.sin(0);
 var y = Math.cos(0);
 var dig = Math.PI / 5 * 4;
 for (var i = 0; i < 5; i++) {//画五角星的五条边
   var x = Math.sin(i * dig);
   var y = Math.cos(i * dig);
   context.lineTo(x * radius, y * radius);
 }
 context.closePath();
 context.stroke();
 context.strokeStyle = "rgba(240,15,0,0.5)";
 context.fill();
 context.restore();
}



  // 鼠标移动事件
  onmousemove = (e) => {
    e.persist();
    const { image1, cansText, canva, imageUrl } = this.state;
    // body...
    let mousex = e.nativeEvent.offsetX;
    let mousey = e.nativeEvent.offsetY;
    let that=this;
    if (image1.drag) {
      // 画背景图
      let bgImage = new Image();
      bgImage.crossOrigin = "anonymous" //解决图片跨域
      bgImage.src = imageUrl;
      bgImage.onload = function () {
        let bgImageW = bgImage.width;
        let bgImageH = bgImage.height;
        canva.width = 580;
        canva.height = 580 * bgImageH / bgImageW;

        // 鼠标移出canvas区域
        if (mousex < 0 || mousex >= 580 || mousey >= canva.height - 5 || mousey <= 0) {
          image1.drag = false;
          image1.scale = false;
        };
        cansText.drawImage(bgImage, 0, 0, 580, 580 * bgImageH / bgImageW);

        if (image1.closeMoudle) return;

        // 移动图片
        if (e.movementX || e.movementY) {
          let tem_imgx = image1.x + e.movementX;
          let tem_imgy = image1.y + e.movementY;
          image1.x = tem_imgx;
          image1.y = tem_imgy;
         
          if (image1.x + image1.width >= 580) {
            image1.x = 580 - image1.width;
          }
          if (image1.y + image1.height >= 580 * bgImageH / bgImageW) {
            image1.y = 580 * bgImageH / bgImageW - image1.height;
          }

          if (image1.y <= 0) {
            image1.y = 0;
          }
          if (image1.x <= 0) {
            image1.x = 0;
          }
          if (image1.selected) {
            //渲染伸缩图标
            let scaleIcon = new Image();
            scaleIcon.crossOrigin = "anonymous";
            scaleIcon.src = image1.scaleIcon;
            scaleIcon.onload = function () {
              cansText.drawImage(scaleIcon, image1.x - 8, image1.y + image1.height - 12, 20, 20);
            }
            // 关闭遮层图标
            let closeIcon = new Image();
            closeIcon.crossOrigin = "anonymous";
            closeIcon.src = image1.closeIcon;
            closeIcon.onload = function () {
              cansText.drawImage(closeIcon, image1.x + image1.width - 10, image1.y - 10, 20, 20)
            }
            // 虚线
            cansText.setLineDash([5, 5]);//定义虚线的长度和间隔
            cansText.strokeStyle = "#fff";
            cansText.strokeRect(image1.x, image1.y, image1.width, image1.height);
          }
          // 清空画布
          cansText.clearRect(image1.x, image1.y, image1.width, image1.height);

          // 被拖拽的图片
          cansText.drawImage(image1.image, image1.x, image1.y, image1.width, image1.height);
          that.setState({
            stampX:(580-tem_imgx)/2,//公章位置的中心x轴
            stampY:(580-tem_imgy)/2 //公章位置的Y轴中心
          })
        };
      }

    }

    //缩放
    if (image1.scale) {
      // 画背景图
      let bgImage = new Image();
      bgImage.crossOrigin = "anonymous"//解决图片跨域
      bgImage.src = imageUrl;
      bgImage.onload = function () {
        let bgImageW = bgImage.width;
        let bgImageH = bgImage.height;
        canva.width = 580;
        canva.height = 580 * bgImageH / bgImageW;
        cansText.drawImage(bgImage, 0, 0, 580, 580 * bgImageH / bgImageW);
        // 缩放图片
        if (e.movementX || e.movementY) {
          let movex = e.movementX;
          let movey = e.movementY;
          if (movex !== 0 || movey !== 0) {
            //根据x缩放方向判断固定点
            if (image1.scaleDirection.search('right') !== -1) {
              image1.width += movex;
            } else if (image1.scaleDirection.search('left') !== -1) {
              image1.x += movex;
              image1.width -= movex;
            }
            if (image1.scaleDirection.search('bottom') !== -1) {
              image1.height += movey;
            } else if (image1.scaleDirection.search('top') !== -1) {
              image1.height -= movey;
              image1.y += movey;
            }
            // 清除画布
            cansText.clearRect(image1.x, image1.y, image1.width, image1.height);
            // 伸缩图标
            //渲染伸缩图标
            let scaleIcon = new Image();
            scaleIcon.crossOrigin = "anonymous";
            scaleIcon.src = image1.scaleIcon;
            scaleIcon.onload = function () {
              cansText.drawImage(scaleIcon, image1.x - 8, image1.y + image1.height - 12, 20, 20);
            }

            // 关闭遮层图标
            let closeIcon = new Image();
            closeIcon.crossOrigin = "anonymous";
            closeIcon.src = image1.closeIcon;
            closeIcon.onload = function () {
              cansText.drawImage(closeIcon, image1.x + image1.width - 10, image1.y - 10, 20, 20)
            }
            // 虚线
            cansText.setLineDash([5, 5]);//定义虚线的长度和间隔
            cansText.strokeStyle = "#fff";
            cansText.strokeRect(image1.x, image1.y, image1.width, image1.height);
            // 被拖拽的图片
            cansText.drawImage(image1.image, image1.x, image1.y, image1.width, image1.height);
          };
        };
      }
    }
  }

  // 保存图片
  saveImage = () => {
    let that = this;
    let { canva, imgUrl,cansText } = that.state;
    
    // 在导出画布之前，把一些图标、虚线去掉;
    this.onmousedown();
    
    setTimeout(function () {
      imgUrl = canva.toDataURL('image/jpeg'); //转换图片为dataURL
      that.setState({
        imgUrl
      }, () => {

        // let obj={};
        // if(that.props.id==='imageUrlFront'){
        //   obj={imageUrlFront:that.state.imgUrl}
        // }else if(that.props.id==='imageUrlLeft'){
        //   obj={imageUrlLeft:that.state.imgUrl}
        // }else if(that.props.id==='imageUrlRight'){
        //   obj={imageUrlRight:that.state.imgUrl}
        // }
        // that.props.parent.getEidtImageUrl(that, obj)
        console.log(imgUrl)
        message.success('保存成功')
      })
    }, 100);
  }
  // 重新编辑
  reMake = () => {
    let { image1 } = this.state;
    let newImage = Object.assign({}, image1, { closeMoudle: false, selected: true })
    this.setState({
      image1: newImage
    }, () => {
      this.canvasInit();
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="canvas-container">
          <canvas onMouseUp={this.onmouseup} onMouseDown={this.onmousedown} onMouseMove={this.onmousemove} id="mycanvas" ref="canvas" style={{ backgroundColor: '#fff' }}>您的浏览器不支持画布标签</canvas>
          <Button type="primary" size="small" onClick={this.saveImage}>保存图片</Button>
          <Button type="default" size="small" style={{ marginLeft: '35px' }} onClick={this.reMake}>重新编辑</Button>
          <div>
            组成的最终作品
		        <img src={this.state.imgUrl} />
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default EidtImage;