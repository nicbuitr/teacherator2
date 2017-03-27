import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
 
import { Teachers } from '../api/teachers.js';
 
import Teacher from './Teacher.jsx';
import TeacherReviews from './TeacherReviews.jsx';
 
// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      selectedTeacher: "",
      hideCompleted: false,
    };
  }

  //Busqueda de profesores
  handleChange(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Meteor.call('teachers.search', text);
  }

  handleClick(event) {
    event.preventDefault();
    let teacherId  = event.currentTarget.id;
    if (this.state.selectedTeacher.trim() != ""){
      document.getElementById(this.state.selectedTeacher).className = "col-md-2 teacher-list-element";
    }
    this.setState({selectedTeacher: teacherId});
    document.getElementById(teacherId).className = "col-md-2 teacher-list-element-selected";
    
    let teacher = this.props.teachers[teacherId.split("_")[1]];  
    
    render(<TeacherReviews teacher={teacher} />, document.getElementById('teacher-reviews-render-target'));
    window.location.replace('#teacher-reviews-div');
    
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
          <img src={"/"+teacher.avg_review+"_star.png"} className="inline-img-responsive rating-stars-img "/>
      </div>
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
          <form className="new-task" onChange={this.handleChange.bind(this)} >
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
          <div id="teacher-reviews-div">
          </div>
        </div>
        <div id="teacher-reviews-render-target"></div>
      </div>
    );
  }
}

App.propTypes = {
  teachers: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
 Meteor.subscribe('teachers');
  
  return {
    teachers: Teachers.find({}, { sort: { avg_review: -1 }, limit: 6}).fetch(),
  };
}, App);