import React, { Component } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Model from './components/Modal';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model:false,
      viewCompleted: false,
      activeItem: {
        title:"",
        description:"",
        completed:false
      },
      todolist: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios.get("http://127.0.0.1:8000/api/tasks/")
    .then(resp=>this.state({todolist:resp.data}))
    .catch(err => console.log(err))
  }


  toggle = () => {
    this.setState({model: !this.state.model});
  }
  handelSubmit = item => {
    this.toggle();
    if (item.id) {
      axios.put(`http://127.0.0.1:8000/api/tasks/${item.id}/`,item)
      .then(resp => this.refreshList())
    }
    axios.post("http://127.0.0.1:8000/api/tasks/", item)
    .then(resp => this.refreshList())
  }
  handelDelet = item => {
      axios.put(`http://127.0.0.1:8000/api/tasks/${item.id}/`)
      .then(resp => this.refreshList())
  }

  createItem = () => {
    const item = {title: "", model: !this.state.model};
    this.setState({activeItem:item, model: !this.state.model});
  }

  editItem = item => {
    this.setState({activeItem:item,model:!this.state.model});
  }


  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          variant={this.state.viewCompleted ? 'outline-secondary' : 'secondary'}
          onClick={() => this.displayCompleted(true)}
        >
          Completed
        </span>
        <span
          variant={this.state.viewCompleted ? 'secondary' : 'outline-secondary'}
          onClick={() => this.displayCompleted(false)}
        >
          Incompleted
        </span>
      </div>
    );
  }; 

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItem = this.state.todolist.filter(
      (item) => item.completed === viewCompleted);

    return newItem.map((item) => (
      <ListGroupItem
        key={item.id}
        className="d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2 ${this.viewCompleted ? 'completed-todo' : ''}`} 
          title={item.title}>
          {item.title}
        </span>
        <span>
          <Button className="btn btn-info mr-2">Edit</Button>
          <Button className="btn btn-danger mr-2">Delete</Button>
        </span>
      </ListGroupItem>
    ));
  };

  render() {
    return (
      <main className="context">
        <h1 className="text-block text-uppercase text-center my-4">Task Management</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <Card className="p-3">
              <div>
                <Button className="btn btn-warning">Add Task</Button>
              </div>
              {this.renderTabList()}
              <ListGroup>{this.renderItems()}</ListGroup>
            </Card>
          </div>
        </div>
        {this.state.model ? (
          <Model
          activeItem = {this.state.activeItem} toggle = {this.toggle}
          onSave = {this.handelSubmit} />
        ) : null}
      </main>
    );
  }
}

export default App;