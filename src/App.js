import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

import About from './pages/about';
import Home from './pages/home';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick.bind(this)
    console.log(props)
  }
  state = {}



  handleItemClick = (e, { name }) => this.setState({ activeItem: name }, () => {
    console.log(this.state, name, e);
    console.log(this.props)
  })

  render() {
    const { activeItem } = this.state

    return (
      <Router>
        <div>
          <Menu stackable>
            <Menu.Item>
              <img src='https://react.semantic-ui.com/logo.png' alt="react" />
            </Menu.Item>

            <Menu.Item
              name='features'
              as="div"
              active={activeItem === 'features'}
              onClick={this.handleItemClick}
            >
              <Link to="/about">about</Link>
            </Menu.Item>

            <Menu.Item
              as="div"
              name='testimonials'
              active={activeItem === 'testimonials'}
              onClick={this.handleItemClick}
            >
              <Link to="/home">home</Link>
            </Menu.Item>

            <Menu.Item name='sign-in' active={activeItem === 'sign-in'} onClick={this.handleItemClick}>
              Sign-in
        </Menu.Item>
          </Menu>
          <div>
            <Route path="/about" component={About} />
            <Route path="/home" component={Home} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
