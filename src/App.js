import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import About from './pages/about';
import Home from './pages/home';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="linkPage">
            <Link to="/about">about</Link>
            <Link to="/home">home</Link>
          </div>
          <div>
            <Route path="/about" component={About} />
            <Route path="/home" component={Home} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
