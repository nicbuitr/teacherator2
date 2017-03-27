import React, { Component, PropTypes } from 'react';

export default class Reviewreview extends Component {
    render(){
        var totalScore = this.props.review.totalScore;
        var rows = [];
        var criterias = this.props.review.criterias;
        for (var i = 0; i < criterias.length; i++) {
        rows.push(
                <div className={((criterias[i].selection==1)?"good-review":" bad-review")+" panel-body"} key={"criteria_description"+(i+1)}> {criterias[i].description + ": " + (criterias[i].selection==1?"Yes!!":"No :(")}</div>
          );
        }
        return(
            <div className="panel panel-default">
                <div className="bg-color panel-heading text-center">                    
                    <img src={"/"+totalScore+"_star.png"} className="inline-img-responsive rating-stars-img " id="stars-img" name="stars-img"/>
                    <span className="pull-right text-uppercase delete-button" onClick={this.deleteReview}>&times;</span>
                </div>
                {rows}
                <div className="panel-body comments">Comments: {this.props.review.comments}</div>
            </div>
        )
    }
}