import { Component } from 'react';

export default class ReviewStars extends Component {

    renderTeacherStars(filled) {
        var starRows = [];
        for (var i = 0; i < 5; i++) {
            starRows.push(                    
                    <span key={this.props.section + '_' + this.props.teacher._id + '_' + (filled?'filled':'empty') + '_' + i}className="star">
                        <i className={'glyphicon glyphicon-star'+ (filled?'':'-empty')}></i>
                    </span>
                );
        }

        return starRows;
    }

    render() {
        return(
            <div key={this.props.section + '_' + this.props.teacher._id +'_2'} className={'rating-container rating'+(this.props.size != ''? '-' + this.props.size:'-md') + ' rating-animate rating-disabled'}>
                <div className="rating-stars">
                    <span className="empty-stars">
                        { this.renderTeacherStars(false) }
                    </span>
                    <span className="filled-stars" style={{width: this.props.stars*20 + '%'}}>
                        { this.renderTeacherStars(true) }
                    </span>
                </div>
            </div>
        );
    }
}