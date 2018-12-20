import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../logo.svg';
import '../../App.css';

class About extends Component {
  handClick() {
    //console.log(this.props);
    this.props.history.push({ pathname: '/video', query: { name: 'hello world', id: 5 } })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p onClick={this.handClick.bind(this)}>跳转到video页面</p>
          <Link to="/">home</Link>
        </header>
      </div>
    )
  }
}
export default About
