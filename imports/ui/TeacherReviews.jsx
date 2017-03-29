import { Component } from 'react'; 
import TeacherInfo from './TeacherInfo.jsx';
import ReviewInfo from './ReviewInfo.jsx';
import AddReview from './AddReview.jsx';

// Teacher component - represents a single todo item
export default class TeacherReviews extends Component {
    renderReviews(){
        return this.props.teacher.reviews.sort(function(a,b) {return (a.createdAt < b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0);} ).map((review, index) => (
              <ReviewInfo review={review} teacher={this.props.teacher} key={'teacher_' + this.props.teacher._id + '_review_'+index} />
          ));
    }

    render(){
        return(
          <div>
             <div className="row">
                <div className="col-md-5">
                  <TeacherInfo teacher={this.props.teacher} key={'teacher_info_'+this.props.teacher._id}/>
                </div>
                <div className="col-md-7">
                  <AddReview teacher={this.props.teacher} key={'teacher_add_review_'+this.props.teacher._id}/>
                </div>
             </div>
              <div className="row reviews text-center">
                {this.renderReviews()}                
              </div>
            </div>
        );
    } 
}