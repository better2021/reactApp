
import React, { Component } from 'react'

class videoList extends Component {
  constructor(props) {
    super(props)
    console.log(props.location.query)
  }

  render() {
    return (
      <div>{
        JSON.stringify(this.props)
      }</div>
    )
  }
}

export default videoList