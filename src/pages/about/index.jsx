import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Weather from '../../component/weather';
import logo from '../../logo.svg';
import styles from './index.less';

const Welcome = ({ text, obj }) => {
  console.log(obj);
  return (
    <div>
      <p>
        <span
          style={{
            color: '#ffefc2',
            textShadow: '3px 3px #000',
            fontSize: '20px'
          }}
        >
          {obj.time}
        </span>
        <span>{obj.name}</span>
      </p>
      <h2>
        hello react!<span>{text}</span>
      </h2>
    </div>
  );
};

class About extends Component {
  constructor() {
    super();
    this.state = {
      txt: ' 这里的state相当于vue中的data定义的变量',
      time: new Date().toLocaleTimeString()
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }

  handClick() {
    //console.log(this.props);
    this.props.history.push({
      pathname: '/video',
      query: { name: 'hello world', id: 5 }
    });
  }
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <img src={logo} className={styles.AppLogo} alt="logo" />
          <Welcome
            obj={{ time: this.state.time, name: 'feiyu' }}
            text="哈哈哈"
          />
          <p className={styles.white} onClick={this.handClick.bind(this)}>
            跳转到video页面
          </p>
          <Link to="/">home</Link>
          <p className={styles.white}>{this.state.txt}</p>
          <Weather />
        </header>
      </div>
    );
  }
}
export default About;
