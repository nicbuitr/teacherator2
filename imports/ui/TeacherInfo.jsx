import { Component } from 'react';

export default class TeacherInfo extends Component {
    render(){
        return(
            <div className="jumbotron teacher-info">
                <div className="container">
                    <div className="row">
                        <img src={this.props.teacher.profile_pic_url} className="teacher-profile-img inline-img-responsive" alt={'Teacher ' + this.props.teacher.name + ' profile image.'}/>
                        <h6><a className="caption" href={this.props.teacher.copyright}>{this.props.teacher.copyright} &copy; </a></h6>
                        <h2>{this.props.teacher.name}</h2>
                        <img src={'/'+this.props.teacher.avg_review+'_star.png'} className="inline-img-responsive rating-stars-img " alt={this.props.teacher.avg_review + ' stars image for  ' + this.props.teacher.name + '  average rating.'}/>
                        <hr/>
                        <div className="container">
                            <h4>{this.props.teacher.occupation}</h4>
                        </div>
                        <hr/>
                        <div className="text-left">
                            <h5><strong>Studies</strong></h5>
                            <ul>
                                {this.props.teacher.studies.map((study, index) => ( <li key={'teacher_' + this.props.teacher._id + 'study_' + index}>{study.title}</li> ))}
                            </ul>
                        </div>
                        <hr/>
                        <div className="text-left">
                            <h5><strong>Classes given</strong></h5>
                            <ul>
                                {this.props.teacher.classes_given.map((term, index) => ( <li key={'teacher_' + this.props.teacher._id + 'class_given_' + index}>{term.name}</li> ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}