
import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";

class MenuLsit extends Component {
  constructor(props) {
    super(props)
    this.handleItemClick.bind(this)
  }
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name }, () => {
    console.log(this.state, name);
    //console.log(this.props)
    this.props.history.push({ pathname: name === 'home' ? '/' : `/${name}` })
  })

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu stackable>
          <Menu.Item>
            <img src='https://react.semantic-ui.com/logo.png' alt="react" />
          </Menu.Item>
          <Menu.Item
            name='home'
            as="div"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
          </Menu.Item>
          <Menu.Item
            as="div"
            name='about'
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
          >
          </Menu.Item>
          <Menu.Item name='video' active={activeItem === 'video'} onClick={this.handleItemClick}>
          </Menu.Item>
          <Menu.Item name='music' active={activeItem === 'music'} onClick={this.handleItemClick}>
          </Menu.Item>
          <Menu.Item name='test' active={activeItem === 'test'} onClick={this.handleItemClick}>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default withRouter(MenuLsit)
