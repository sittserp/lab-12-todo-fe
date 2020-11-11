import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import './App.css';
// import Todos from './Todo.js';
import Login from './Login.js'
import SignUp from './SignUp.js'
import Home from './Home.js'
// import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {
  state = { token: localStorage.getItem('TOKEN') }

  handleTokenChange = (myToken) => {
    this.setState({ token: myToken });
    localStorage.setItem('TOKEN', myToken);
  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
          </ul>
          <Switch>
            <Route exact path='/home'
              render={(routerProps) => <Home
                {...routerProps} />}
            />
            <Route exact path='/login'
              render={(routerProps) => <Login
                {...routerProps} />}
            />
            <Route exact path='/signup'
              render={(routerProps) => <SignUp
                {...routerProps} />}
            />
            //   notice that we pass the token here! This is required!
            {/* <PrivateRoute
              exact
              path='/todo'
              token={this.state.token}
              render={(routerProps) => <Todo
                {...routerProps} />} /> */}
          </Switch>
        </Router>
      </div>
    )
  }
}