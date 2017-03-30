import { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Teachers } from '../api/teachers.js';
import TeacherReviews from './TeacherReviews.jsx';
import { Meteor } from 'meteor/meteor';
 
// App component - represents the whole app
class App extends Component {

    constructor(props) {
        super(props);
 
        this.state = {
            selectedTeacherId: '',
            queryName:'',
            hideCompleted: false,
            maxTeachersToList: 3
        };
    }
    
    componentDidMount(){
        document.documentElement.lang = 'en';
    }

    handleClick(event) {
        event.preventDefault();
        let teacherId  = event.currentTarget.id;
        if (this.state.selectedTeacherId.trim() != ''){
            if (document.getElementById(this.state.selectedTeacherId) != null){
                document.getElementById(this.state.selectedTeacherId).className = 'col-xs-4 teacher-list-element';
            }
        }
        this.setState({selectedTeacherId: teacherId});
        document.getElementById(teacherId).className = 'col-xs-4 teacher-list-element-selected';
    }

    handleKeyDown(event){
        if (event.keyCode != 13 && event.keyCode != 32){
            return;
        }
        this.handleClick(event);
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    renderTeachers(e) {
        if(e != undefined){
            if(e.target.name === 'queryInput'){
                e.preventDefault();
                this.setState({queryName: e.target.value});
            }
        }

        let filteredTeachers = this.props.teachers;

        filteredTeachers = filteredTeachers.filter(teacher => teacher.name.toUpperCase().includes(this.state.queryName.toUpperCase()));
        if (filteredTeachers.length === 0){
            return (<h2><strong><i>Didn't find any teacher with that name, please try another name...</i></strong></h2>);
        }
        else{
            return filteredTeachers.slice(0, this.state.maxTeachersToList).map((teacher) => (
        <div key={'teacher_thumbnail_'+teacher._id} id={teacher._id} className="col-xs-4 teacher-list-element" onClick={this.handleClick.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} tabIndex="0" aria-label={'Select teacher ' + teacher.name}>
            <img key={'teacher_thumbnail_image_'+teacher._id} src={teacher.profile_pic_url} className="teacher-profile-img inline-img-responsive" alt={'Teacher ' + teacher.name + ' profile image thumbnail.'}/>
            <img key={'teacher_thumbnail_stars_'+teacher._id} src={'/'+teacher.avg_review+'_star.png'} className="inline-img-responsive list-rating-stars-img" alt={teacher.avg_review + ' stars image for  ' + teacher.name + '  average rating.'}/>
            <h5 key={'teacher_thumbnail_name_'+teacher._id}>{teacher.name}</h5>
        </div>
      ));
        }
    }
 
    render() {
        return (
      <div className="container">
        <header className="text-center jumbotron">
          <div className="app-title">
            <h1>Teacherator</h1>
            <p>The teacher reviewing App</p>
          </div>
          <form className="new-task" >
            <hr/>
            <input type="text" aria-label="Type a teacher name" ref="textInput" name="queryInput" placeholder="Type a teacher name" value={this.state.queryName}  onChange={this.renderTeachers.bind(this)} />
            <hr/>
          </form>
        </header>
        <div className="text-center jumbotron">
          <h2><strong>Top Rated Teachers</strong></h2>
          <hr/>
          <div className="row teacher-list">
            {this.renderTeachers()}
          </div>
          <hr/>
          <div id="teacher-reviews-div"></div>
        </div>
        {(this.props.teachers.find(teacher => teacher._id._str === this.state.selectedTeacherId) != null)?<TeacherReviews key={'teacher_reviews_'+this.state.selectedTeacherId} teacher={this.props.teachers.find(teacher => teacher._id._str === this.state.selectedTeacherId)} />:''}
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
        teachers: Teachers.find({}, { sort: { avg_review: -1 }}).fetch(),
    };
}, App);