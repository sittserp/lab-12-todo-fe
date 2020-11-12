import React, { Component } from 'react'
import request from 'superagent';

export default class Todo extends Component {
    state = {
        list: [],
        todo: '',
        loading: false
    }

    componentDidMount = async () => {
        await this.fetchList()
    }

    fetchList = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request
            .get('https://todo-sittserp.herokuapp.com/api/todo')
            .set('Authorization', token)


        await this.setState({ list: response.body, loading: false })
    }

    handleSubmit = async (e) => {
        const { todo } = this.state;
        const { token } = this.props;

        e.preventDefault();

        const newTodo = {
            todo: todo,
        };

        await this.setState({ loading: true });

        await request.post('https://todo-sittserp.herokuapp.com/api/todo')
            .send(newTodo)
            .set('Authorization', token);

        await this.fetchList();
    }

    handleDoneClick = async (someId) => {
        const { token } = this.props;

        await request.put(`https://todo-sittserp.herokuapp.com/api/todo/${someId}`)
            .set('Authorization', token);

        await this.fetchList();
    }

    render() {
        const {
            todo,
            loading,
            list,
        } = this.state;

        return (
            <div>
                Welcome to your todo list!
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add a todo:
                        <input
                            value={todo}
                            onChange={(e) => this.setState({ todo: e.target.value })}
                        />
                    </label>
                    <button>
                        Add to List
                        </button>
                </form>
                {
                    loading
                        ? 'LOADING!!!!!'
                        : list.map(item => <div key={`${item.todo}${item.id}${Math.random()}`} style={{
                            textDecoration: item.completed ? 'line-through' : 'none'
                        }
                        }>
                            To Do: {item.todo}
                            {
                                item.completed ? '' : <button
                                    // if you're ever onClicking inside of a map, you might need to make an anonymous function like this:
                                    onClick={() => this.handleDoneClick(item.id)}>
                                    Done
                            </button>
                            }
                        </div>)
                }
            </div>
        )
    }
}