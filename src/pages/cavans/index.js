import React, { Component } from 'react'

class Canvas extends Component {
  constructor(props){
    super(props)
    this.canvasRef = React.createRef()
    this.colorRef = React.createRef()
    this.imgRef = React.createRef()
  }

  state = {
    netType:'',
    netSpeed:''
  }

  componentDidMount(){
    if(navigator.connection){
      let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      console.log(connection)
      this.setState({
        netType:connection.effectiveType,
        netSpeed:connection.downlink*1204/8 // 兆比特/秒为单位换算为常用的KB/sec (Kb每秒)
      })
       // 检测网络状态变化
      connection.addEventListener('change',()=>{
        this.setState({
          netType:connection.effectiveType,
          netSpeed:connection.downlink*1204/8 // 兆比特/秒为单位换算为常用的KB/sec (Kb每秒)
        })
      })
    }
    
    this.rectColor()
    this.draw()
    this.drawImg()
  }

  // 矩形
  rectColor(){
    // console.log(this.canvasRef.current)
    const ctx = this.canvasRef.current.getContext('2d')
    ctx.fillStyle = 'rgb(200,0,0)'
    ctx.fillRect(10,10,100,80)

    ctx.fillStyle = 'rgba(0,0,200,0.5)'
    ctx.fillRect(30,30,100,80)

    ctx.beginPath();
    ctx.moveTo(100,120);
    ctx.lineTo(200, 100);
    ctx.lineTo(100, 200);
    ctx.fill();

    
    // 保存为jpg格式图片
    let canvas = this.canvasRef.current
    let jpgUrl = canvas.toDataURL('image/jpeg',0.8) // 第二个参数为图片的质量(0-1)
    let img = new Image()
    img.src= jpgUrl
    document.getElementById('canvasBox').appendChild(img)
  }

  // 圆形
  draw(){
    const colorCtx = this.colorRef.current.getContext('2d');
    // 画背景
    colorCtx.fillStyle = '#FD0';
    colorCtx.fillRect(0,0,75,75);
    colorCtx.fillStyle = '#6C0';
    colorCtx.fillRect(75,0,75,75);
    colorCtx.fillStyle = '#09F';
    colorCtx.fillRect(0,75,75,75);
    colorCtx.fillStyle = '#F30';
    colorCtx.fillRect(75,75,75,75);
    colorCtx.fillStyle = '#FFF';
  
    // 设置透明度值
    colorCtx.globalAlpha = 0.2;
  
    // 画半透明圆
    for (var i=0;i<7;i++){
      colorCtx.beginPath();
      colorCtx.arc(75,75,10+10*i,0,Math.PI*2,true);
      colorCtx.fill();
    }

    // 默认保存为png的图片
    const canvas = this.colorRef.current
    const dataUrl = canvas.toDataURL()
    let img = new Image()
    img.src = dataUrl
    document.getElementById('canvasBox').appendChild(img)
  }

  // 创建图片平铺
  drawImg(){
    const ctx = this.imgRef.current.getContext('2d')
    // 创建新image对象，用于作图
    const img = new Image()
    img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png'
    img.onload = function(){
      // 创建图标
      let ptr = ctx.createPattern(img,'repeat')
      ctx.fillStyle = ptr 
      ctx.fillRect(0,0,300,200)
      ctx.font = "48px serif";
      ctx.textBaseline = "hanging";
      ctx.textAlign = 'center';
      ctx.strokeText("Hello world", 150, 100)
    }
  }


  render() {
    let {netType,netSpeed} = this.state
    return (
      <div id='canvasBox'>
        <p style={{textIndent:'2em'}}>当前的网络类型为：<span style={{color:'#f00'}}>{netType}</span></p>
        <p style={{textIndent:'2em'}}>当前的网速为: <span style={{color:'#f00'}}>{netSpeed}Kb/s</span></p>
        <canvas width="300" height="200" ref={this.canvasRef}></canvas>
        <canvas ref={this.colorRef}></canvas>
        <canvas ref={this.imgRef}></canvas>
      </div>
    )
  }
}

export default Canvas