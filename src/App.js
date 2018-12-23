import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import './App.css';

//按需加载组件（也称懒加载）
const MenuLsit = lazy(() => import("./component/menu"));
const Home = lazy(() => import('./pages/home'))
const About = lazy(() => import('./pages/about'))
const Video = lazy(() => import('./pages/video'))
const Music = lazy(() => import('./pages/music'))
const NotFind = lazy(() => import('./component/notFind'))

class App extends Component {
  //我们必须在等待加载时显示一些后备内容 - 例如加载指示符,这是使用Suspense 组件完成的。
  render() {
    return (
      <Router>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <MenuLsit />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/video" component={Video} />
              <Route path="/music" component={Music} />
              <Redirect to="/notFind" component={NotFind} />  {/* 没有找到路由跳到404页面 */}
            </Switch>
          </Suspense>
        </div>
      </Router>
    )
  }
}

export default App;
