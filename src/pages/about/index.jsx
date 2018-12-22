import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../logo.svg';

const Welcome = ({ text, obj }) => {
  console.log(obj)
  return (
    <div>
      <p><span style={{ color: 'green', textShadow: '3px 3px #000' }}>{obj.time}</span><span>{obj.name}</span></p>
      <h2>hello react!<span>{text}</span></h2>
    </div>
  )
}

class About extends Component {
  constructor() {
    super()
    this.state = { txt: ' 这里的state相当于vue中的data定义的变量', time: new Date().toLocaleTimeString() }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.tick()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    })
  }

  handClick() {
    //console.log(this.props);
    this.props.history.push({ pathname: '/video', query: { name: 'hello world', id: 5 } })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome obj={{ time: this.state.time, name: 'feiyu' }} text="哈哈哈" />
          <p onClick={this.handClick.bind(this)}>跳转到video页面</p>
          <Link to="/">home</Link>
          <p>{this.state.txt}</p>
        </header>
      </div>
    )
  }
}
export default About
