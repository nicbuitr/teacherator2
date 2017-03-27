import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
 
import TeacherInfo from './TeacherInfo.jsx';
import ReviewInfo from './ReviewInfo.jsx';
import AddReview from './AddReview.jsx';

// Teacher component - represents a single todo item
export default class TeacherReviews extends Component {
  renderReviews(){
      return this.props.teacher.reviews.reverse().map((review, index) => (
              <ReviewInfo review={review} key={"review"+index} />
          ));
  }

   render(){
       return(
          <div>
             <div className="row">
                <div className="col-md-5">
                    <TeacherInfo teacher={this.props.teacher}/>
                </div>
                <div className="col-md-7">
                  AddReview teacher={this.props.teacher}/>
                </div>
             </div>
             <div className="row reviews text-center">
                {this.renderReviews()}
              </div>
            </div>
       )
   } 
}