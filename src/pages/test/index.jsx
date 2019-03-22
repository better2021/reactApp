import React, { Component } from 'react'
import styles from './index.less'

export default class index extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       value:'',
       btns:[{class:'blur(10px)',name:'迷糊'},{class:'opacity(0.5)',name:'透明度'},
      {class:'grayscale(1)',name:'灰度'},{class:'sepia(0.5)',name:'褐色'},{class:'saturate(0.5)',name:'饱和度'},
      {class:'invert(60%)',name:'反转颜色'},{class:'brightness(1.5)',name:'亮度'},{class:'contrast(1.5)',name:'对比度'},
      {class:'drop-shadow(10px 10px red)',name:'阴影'},{class:'hue-rotate(150deg)',name:'色相旋转'}],
      clazz:''  // 样式
    }
  }


  componentDidMount(){
    console.log('%c dom已加载完成✈❤','color:pink;font-size:30px;font-weight:600;text-shadow:1px 1px 3px #dddddd')
  }

  changeColor = (item)=>{
    console.log(item)
    this.setState({
      clazz:item.class
    })
  }

  changeInput = (event)=>{
    // console.log(event.target.value)
    this.setState({
      value:event.target.value
    })
  }
  
  render() {
    const {value,btns,clazz } = this.state  // 对象的解构

    return (
      <div className={styles.boxInput}>
        <input type="text" onInput = {this.changeInput} className={styles.text} placeholder="输入内容试试哦"/>
        <p>react中图片的引入,使用require()</p>
        <img src={require('../../images/pic.jpg')} style={{filter:clazz}} alt=""/>
        <p>{value}</p>
        <div className={styles.btnbox}>
        {btns.map((item,index)=>{
          return(<button key={index} onClick={() => this.changeColor(item)}>{item.name}</button>)
        })}
        </div>
      </div>
    )
  }
}
