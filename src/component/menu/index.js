import React, { Component } from "react"
import { Menu } from "semantic-ui-react"
import { withRouter } from "react-router-dom"

class MenuLsit extends Component {
  constructor(props) {
    super(props)
    this.handleItemClick.bind(this)
  }
  state = {
    title: ["home", "about", "video", "music", "test", "canvas", "study"]
  }

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name }, () => {
      console.log(this.state, name)
      //console.log(this.props)
      this.props.history.push({ pathname: name === "home" ? "/" : `/${name}` })
    })

  render() {
    const { activeItem, title } = this.state
    return (
      <div>
        <Menu stackable>
          <Menu.Item>
            <img src="https://react.semantic-ui.com/logo.png" alt="react" />
          </Menu.Item>
          {title.map(item => {
            return (
              <Menu.Item
                name={item}
                active={activeItem === item}
                key={item}
                onClick={this.handleItemClick}
              />
            )
          })}
        </Menu>
      </div>
    )
  }
}

export default withRouter(MenuLsit)
