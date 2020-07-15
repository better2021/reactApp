import React, { Component } from "react"
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import styles from "./index.less"

class Test extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      btns: [
        { class: "blur(10px)", name: "迷糊" },
        { class: "opacity(0.5)", name: "透明度" },
        { class: "grayscale(1)", name: "灰度" },
        { class: "sepia(0.5)", name: "褐色" },
        { class: "saturate(0.5)", name: "饱和度" },
        { class: "invert(60%)", name: "反转颜色" },
        { class: "brightness(1.5)", name: "亮度" },
        { class: "contrast(1.5)", name: "对比度" },
        { class: "drop-shadow(10px 10px red)", name: "阴影" },
        { class: "hue-rotate(150deg)", name: "色相旋转" },
        { class: "", name: "复原" }
      ],
      clazz: "", // 样式
      editorState: BraftEditor.createEditorState(null)
    }
  }

  // 组件挂载到页面后，会被自动执行
  componentDidMount() {
    console.log(
      "%c dom已加载完成✈❤",
      "color:pink;font-size:30px;font-weight:600;text-shadow:1px 1px 3px #dddddd"
    )
  }

  /**
   * 组件状态改变时，自动执行
   * 返回true，则会自动执行render函数
   * 返回false，则不执行render函数
   * 可以用来优化性能
   */
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate")
    if (nextProps.xx !== this.props.xx) {
      return true
    } else {
      return false
    }
  }

  changeColor = item => {
    console.log(item)
    this.setState({
      clazz: item.class
    })

    const {editorState} = this.state
    console.log(editorState.toHTML())
  }

  /**
   * 两种方法获取input上输入的value值
   * 第一种：event事件获取value -> event.target.value
   * 第二种：ref的绑定获取input上的value值 -> this.input.value
   */
  changeInput = event => {
    // const val = event.target.value
    const val = this.input.value
    this.setState({
      value: val
    })
  }

  handleChange = (editorState) => {
    this.setState({ editorState })
  }

  render() {
    const { value, btns, clazz } = this.state // 对象的解构
    console.log("render")
    return (
      <div className={styles.boxInput}>
        <input
          type="text"
          onInput={this.changeInput}
          ref={input => {
            this.input = input
          }}
          className={styles.text}
          placeholder="输入内容试试哦"
        />
        <p>react中图片的引入,使用require()</p>
        <img
          src={require("../../images/pic.jpg")}
          style={{ filter: clazz }}
          alt=""
        />
        <p>{value}</p>
        <div className={styles.btnbox}>
          {btns.map((item, index) => {
            return (
              <button key={index} onClick={() => this.changeColor(item)}>
                {item.name}
              </button>
            )
          })}
        </div>
        <div className={styles.editor}>
          <BraftEditor value={this.state.editorState} onChange={this.handleChange}/>
        </div>
        
      </div>
    )
  }
}

export default Test
