import React, { Component } from 'react'
import axios from 'axios'
import './index.less'

class Weather extends Component {

  state = {
    tip: '',
    yesterday: {},
    forecast: []
  }

  componentDidMount() {
    this.getData()
  }

  //获取各地天气
  async getData(area = '武汉') {
    console.log(this.props)
    const res = await axios({
      url: 'https://www.apiopen.top/weatherApi',
      method: 'GET',
      params: { city: area }
    })
    if (res.status === 200) {
      console.log(res.data);
      this.setState({
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
    return (<div className="weatherBox">
      <div className="weather">
        <p>日期：{this.state.yesterday.date}</p>
        <p>
          <span className="left">{this.state.yesterday.high}</span>
          <span className="right">{this.state.yesterday.low}</span>
        </p>
        <p>
          <span>{this.state.yesterday.type}</span>
          <span>{this.state.yesterday.fx}</span>
        </p>
      </div>
      <ul>
        {
          this.state.forecast.map((item, index) => {
            return (
              <div className="weather" key={index}>
                <p>日期：{item.date}</p>
                <p>
                  <span className="left">{item.high}</span>
                  <span className="right">{item.low}</span>
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