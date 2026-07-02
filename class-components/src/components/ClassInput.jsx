import { Component } from 'react';

class TaskCount extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='count'>
        <p>Tasks left: {this.props.count}</p>
      </div>
    )
  }
}


class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      save: '',
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.save) {
      const task = this.state.todos.findIndex(task => task === this.state.save)
      const newTodo = this.state.todos
      newTodo[task] = this.state.inputVal
      this.setState((state) => ({
        ...state,
        todos: newTodo,
        inputVal: ''
      }))
      console.log(task)
      return
    }
    this.setState((state) => ({
      ...state,
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleDelete(e) {
    const id = e.currentTarget.name
    const task = this.state.todos.filter(task => task !== id)
    this.setState((state) => ({
      ...state,
      todos: task
    }))
  }

  handleEdit(e) {
    const id = e.currentTarget.name
    const task = this.state.todos.find(task => task === id)
    this.setState((state) => ({
      ...state,
      save: task,
      inputVal: task,
    }))
  }
  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">{this.state.save ? 'Resubmit' : 'Submit'}</button>
        </form>
        <h4>All the tasks!</h4>
        <TaskCount count={this.state.todos.length}/>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <>
              <li key={todo}>{todo}</li>
              <button className='edit' name={todo} onClick={(e) => this.handleEdit(e)}>Edit</button>
              <button className='delete' name={todo} onClick={(e) => this.handleDelete(e)}>Delete</button>
            </>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
