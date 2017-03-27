import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
 
// Teacher component - represents a single todo item
export default class Teacher extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('teachers.setChecked', this.props.teacher._id, !this.props.teacher.checked);
  }
 
  deleteThisTeacher() {
    Meteor.call('teachers.remove', this.props.teacher._id);
  }
 
  render() {
    // Give teachers a different className when they are checked off,
    // so that we can style them nicely in CSS
    let teacher = this.props.teacher;
    const teacherClassName = teacher.name == '' ? 'checked' : '';    
 
    return (
      <li className={teacherClassName}>
        <button className="delete" onClick={this.deleteThisTeacher.bind(this)}>
          &times;
        </button>
 
        <input
          type="checkbox"
          readOnly
          checked={this.props.teacher.checked}
          onClick={this.toggleChecked.bind(this)}
        />
 
        <span className="text">{this.props.teacher.name}</span>
      </li>
    );
  }
}
 
Teacher.propTypes = {
  // This component gets the teacher to display through a React prop.
  // We can use propTypes to indicate it is required
  teacher: PropTypes.object.isRequired,
};