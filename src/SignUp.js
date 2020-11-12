import React, { Component } from 'react'
import request from 'superagent';

export default class SignUp extends Component {

    state = {
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);

        const user = await request
            .post('https://todo-sittserp.herokuapp.com/auth/signup')
            .send(this.state);

        console.log(user.body, 'now will send to todo list');

        localStorage.setItem('USERNAME', user.email);

        this.props.handleTokenChange(user.body.token);
        this.props.handleUsernameChange(user.body.email);

        this.props.history.push('/todo')
    }

    render() {
        return (
            <div>
                SignUp Page
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username: <input onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} />
                    </label>
                    <label>
                        Password: <input onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} type="password" />
                    </label>
                    <button>Sign Up!</button>
                </form>
            </div>
        )
    }
}
