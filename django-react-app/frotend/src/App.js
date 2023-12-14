import React, { Component } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import CustomModal from './components/Modal';

const tasks = [
  {
    id: 1,
    title: 'Dunning',
    description: 'Sending dunning letters to clients for uncollected cash.',
    completed: false,
  },
  {
    id: 2,
    title: 'Milk',
    description: 'Go to the grocery shop and buy a milk packet.',
    completed: false,
  },
  {
    id: 3,
    title: 'Home Work',
    description: 'Do my homework.',
    completed: false,
  },
  {
    id: 4,
    title: 'Read',
    description: 'Read at least three pages from the book.',
    completed: false,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model:false,
      viewCompleted: false,
      taskList: tasks,
      activeItem: {
        title:"",
        description:"",
        completed:false
      },
      taskList: tasks,
    };
  }

  toggle = () => {
    this.setState({model: !this.state.model});
  }
  handelSubmit = item => {
    this.toggle();
    alert('Saved!' + JSON.stringify(item));
  }
  handelDelet = item => {
    alert('Deleted!' + JSON.stringify(item));
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
        <Button
          variant={this.state.viewCompleted ? 'outline-secondary' : 'secondary'}
          onClick={() => this.displayCompleted(true)}
        >
          Completed
        </Button>
        <Button
          variant={this.state.viewCompleted ? 'secondary' : 'outline-secondary'}
          onClick={() => this.displayCompleted(false)}
        >
          Incompleted
        </Button>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItem = this.state.taskList.filter((item) => item.completed === viewCompleted);

    return newItem.map((item) => (
      <ListGroupItem
        key={item.id}
        className="d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2 ${this.viewCompleted ? 'completed-todo' : ''}`} title={item.title}>
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
          <CustomModal
          activeItem = {this.state.activeItem} toggle = {this.toggle}
          onSave = {this.handelSubmit} />
        ) : null}
      </main>
    );
  }
}

export default App;