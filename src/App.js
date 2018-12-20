import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

import MenuLsit from './component/menu';
import Home from './pages/home';
import About from './pages/about';
import Video from './pages/video'

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Router>
        <div>
          <MenuLsit />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/video" component={Video} />
            <Redirect to="/notFind" />  {/* 没有找到路由跳到404页面 */}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
