import React,{Component} from 'react';
// import Drag from './drag';

class Stamp extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
			currentPage: '路由入口文件',
			compnayName:'大中华区块链科技有限公司',
			stampUrl:'',
			canva:{}
	    }
	}
	componentDidMount(){
		let canvas=document.getElementById('canvas');
		let context=canvas.getContext('2d');
		
		this.drawText(context,canvas);

	}

	changeName=(e)=>{
		let compnayName=e.target.value;
		this.setState({
			compnayName
		})
		// EvenCompEllipse(context1, canvas1.width/2, canvas1.height/2, 100, 50);
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
		  var width = canvas.width / 2;        //控制公章的X的中心轴位置
		  var height = canvas.height / 2;      //控制公章的Y的中心轴位置
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
	// 生成公章
	makeStamp=()=>{
		let that=this;
		let canva = document.getElementById('canvas');
		setTimeout(function () {
		 let stampUrl = canva.toDataURL('image/jpeg'); //转换图片为dataURL
			that.setState({
				stampUrl
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
			  console.log(stampUrl)
			})
		  }, 100);
	}

	
	render(){
		return(
		<div>
		<lable style={{display: 'inlineBlock',margin:'50px',fontSize: '18px'}}>印章文字:
		<input type="text" id="textname" value={this.state.compnayName} onChange={this.changeName} style={{height: '30px',width: '200px',}} />
		</lable>
		<input type="button" onClick="" id="changename" value="修改" />
		<div>  
		<canvas id="canvas" width="150" height="150" style={{marginLeft: '130px',border: '1px solid #666666'}}></canvas>
		<button onClick={this.makeStamp}>生成公章</button>
		</div>
              {/* {this.state.stampUrl!==''?<Drag stampUrl={this.state.stampUrl}></Drag>:null} */}
		</div>
		)
	}
}
export default Stamp;