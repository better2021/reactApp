import React, { Component } from 'react';
import axios from 'axios';
import './index.css'

class Home extends Component {
  state = {
    dataSource: []
  }

  componentDidMount() {
    this.getDate();
  }

  async getDate() {
    const res = await axios({
      url: 'http://admin-api.tgtestv.com/attr',
      method: 'GET',
      params: {
        page: 1,
        page_size: 20
      }
    })

    if (res.status === 200) {
      console.log(res.data)
      this.setState({ dataSource: res.data.data })
    } else {
      console.log(res.data.message)
    }
  }

  handleClick(item) {
    console.log(item.id)
  }

  render() {
    return (
      <div className="homeBox">
        <ul>
          {
            this.state.dataSource.map((item, index) => {
              return (
                <li key={index} onClick={() => { this.handleClick(item) }}>{item.name}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Home

