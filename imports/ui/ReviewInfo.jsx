import { Component } from 'react';
import ReviewStars from './ReviewStars.jsx';
import { Meteor } from 'meteor/meteor';

export default class ReviewInfo extends Component {
    deleteReview(e){
        e.preventDefault();
        Meteor.call('teachers.deleteReview', this.props.teacher._id, this.props.review);
        this.props.teacher.reviews.pop(this.state);
    }

    render(){
        var totalScore = this.props.review.totalScore;
        var rows = [];
        var criterias = this.props.review.criterias;
        for (var i = 0; i < criterias.length; i++) {
            rows.push(
                <div className={((criterias[i].selection==1)?'good-review':' bad-review')+' panel-body'} key={'criteria_description'+(i+1)}> {criterias[i].description + ': ' + (criterias[i].selection==1?'Yes!!':'No :(')}</div>
          );
        }
        return(
            <div className="panel panel-default" tabIndex="0">
                <div className="bg-color panel-heading text-center">                    
                    <span className="pull-right text-uppercase delete-button" onClick={this.deleteReview.bind(this)}>&times;</span>
                    <ReviewStars teacher={this.props.teacher} section="teacher_reviews" stars={totalScore} size="xl"/>
                </div>
                {rows}
                <div className="panel-body comments">Comments: {this.props.review.comments}</div>
            </div>
        );
    }
}