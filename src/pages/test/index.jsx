import React, { Component } from 'react'
import styles from './index.less'

export default class index extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       value:''
    }
  }

  changeInput = (event)=>{
    // console.log(event.target.value)
    this.setState({
      value:event.target.value
    })
  }
  
  render() {
    return (
      <div className={styles.boxInput}>
        <input type="text" onInput = {this.changeInput} className={styles.text} placeholder="输入内容试试哦"/>
        <p>react中图片的引入,使用require()</p>
        <img src={require('../../images/pic.jpg')} alt=""/>
        <p>{this.state.value}</p>
      </div>
    )
  }
}
