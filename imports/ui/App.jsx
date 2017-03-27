import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
 
import { Tasks } from '../api/tasks.js';
import { Teachers } from '../api/teachers.js';
 
import Task from './Task.jsx';
import Teacher from './Teacher.jsx';
import TeacherReviews from './TeacherReviews.jsx';
 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Meteor.call('tasks.insert', text);
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  handleClick(event) {
    event.preventDefault();
    let teacherId  = event.currentTarget.id.split("_")[1];
    console.log("Teacher ID: "+ teacherId);
    let teacher = this.props.teachers[teacherId];
    
    render(<TeacherReviews teacher={teacher} />, document.getElementById('teacher-reviews-render-target'));
    
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTeachers() {
    let filteredTeachers = this.props.teachers;
    if (this.state.hideCompleted) {
      filteredTeachers = filteredTeachers.filter(teacher => !teacher.checked);
    }
    return filteredTeachers.map((teacher, index) => (
      <div key={"teacher_" + index} id={"teacher_" + index} className="col-md-2 teacher-list-element" onClick={this.handleClick.bind(this)}>
          <img src={teacher.profile_pic_url} className="teacher-profile-img inline-img-responsive" />
          <h5>{teacher.name}</h5>
          TODO Stars ***
      </div>
    ));
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header className="text-center jumbotron">
          <div className="app-title">
            <h1>Teacherator</h1>
            <p>The teacher reviewing App</p>
          </div>
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <hr/>
            <input
              type="text"
              ref="textInput"
              placeholder="Type a teacher name"
            />
            <hr/>
          </form>
        </header>
        <div className="jumbotron">
          <div className="text-center row">
            {this.renderTeachers()}
          </div>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>
        </div>
        <div id="teacher-reviews-render-target"></div>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  teachers: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};
 
export default createContainer(() => {
 Meteor.subscribe('tasks');
 Meteor.subscribe('teachers');
  
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    teachers: Teachers.find({}, { sort: { avg_review: -1 }, limit: 6}).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
}, App);