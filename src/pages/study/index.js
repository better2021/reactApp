import React, { Component } from "react"
import axios from "axios"

import Navbar from "../../component/Navbar"
import Item from "../../component/users/item"
import styles from "./index.less"

export default class Study extends Component {
  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const res = await axios.get("https://api.github.com/users")
    if (res.status !== 200) {
      console.log(res.statusText)
      return
    }
    console.log(res.data)
    this.setState({
      users: res.data,
      loading: false
    })
  }

  render() {
    let txt = "React学习"
    return (
      <div className={styles.box}>
        <h1>
          <Navbar title={txt} />
        </h1>
        <Item loading={this.state.loading} users={this.state.users} />
      </div>
    )
  }
}
