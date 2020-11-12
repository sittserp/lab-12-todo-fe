import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import './App.css';
import Todo from './Todo.js';
import Login from './Login.js'
import SignUp from './SignUp.js'
import Home from './Home.js'
import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {
  state = {
    token: localStorage.getItem('TOKEN' || ''),
    username: localStorage.getItem('USERNAME' || '')
  }

  handleTokenChange = (myToken) => {
    this.setState({ token: myToken });
    localStorage.setItem('TOKEN', myToken);
  }

  handleUsernameChange = (myUsername) => {
    this.setState({ username: myUsername });
    localStorage.setItem('USERNAME', myUsername);
  }

  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');

    this.setState({
      username: '',
      token: ''
    })

  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            {
              this.state.token
                ? <div>
                  Hello, {this.state.username}
                  <button onClick={this.logOut}>Log out</button>
                </div>
                : <>
                  <Link to="/login"><div>log in</div></Link>
                  <Link to="/signup"><div>sign up</div></Link>
                </>}
          </ul>
          <Switch>
            <Route exact path='/home'
              render={(routerProps) => <Home
                {...routerProps} />}
            />
            <Route exact path='/login'
              render={(routerProps) => <Login
                {...routerProps} handleTokenChange={this.handleTokenChange}
                handleUsernameChange={this.handleUsernameChange} />}
            />
            <Route exact path='/signup'
              render={(routerProps) => <SignUp
                {...routerProps} handleTokenChange={this.handleTokenChange}
                handleUsernameChange={this.handleUsernameChange} />}
            />
            <PrivateRoute
              exact
              path='/todo'
              token={this.state.token}
              render={(routerProps) => <Todo
                {...routerProps}
                token={this.state.token} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}