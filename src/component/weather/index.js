import React, { Component } from 'react'
import axios from 'axios'
import styles from './index.less'

class Weather extends Component {

  state = {
    city: '',
    tip: '',
    yesterday: {},
    forecast: []
  }

  componentDidMount() {
    this.getData()
  }

  //获取各地天气
  async getData(area = '武汉') {
    console.log(this.props.content, '-----')
    const res = await axios({
      url: 'https://www.apiopen.top/weatherApi',
      method: 'GET',
      params: { city: area }
    })
    if (res.status === 200) {
      console.log(res.data);
      this.setState({
        city: res.data.data.city,
        tip: res.data.data.ganmao,
        yesterday: res.data.data.yesterday,
        forecast: res.data.data.forecast
      }, () => {
        console.log(this.state.tip)
      })
    } else {
      console.log(res.data.msg)
    }
  }

  render() {
    return (<div className={styles.weatherBox}>
      <div className={styles.tips}>
        <h3>地区：{this.state.city}</h3>
        <p>温馨提示：{this.state.tip}</p>
      </div>
      <ul>
        {
          this.state.forecast.map((item, index) => {
            return (
              <div className={styles.weather} key={index}>
                <p>日期：{item.date}</p>
                <p>
                  <span className={styles.left}>{item.high}</span>
                  <span className={styles.right}>{item.low}</span>
                </p>
                <p>
                  <span>{item.type}</span>
                  <span>{item.fx}</span>
                </p>
              </div>
            )
          })
        }
      </ul>
    </div>)
  }
}


export default Weather