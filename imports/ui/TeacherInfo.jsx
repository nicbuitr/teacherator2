import { Component } from 'react';

export default class TeacherInfo extends Component {
    render(){
        return(
            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={this.props.teacher.profile_pic_url} className="teacher-profile-img inline-img-responsive" alt={'Teacher ' + this.props.teacher.name + ' profile image.'}/>
                            <h6><a className="caption" href={this.props.teacher.copyright}>{this.props.teacher.copyright} &copy; </a></h6>
                            <h2>{this.props.teacher.name}</h2>
                            <img src={'/'+this.props.teacher.avg_review+'_star.png'} className="inline-img-responsive rating-stars-img " alt={this.props.teacher.avg_review + ' stars image for  ' + this.props.teacher.name + '  average rating.'}/>
                            <hr/>
                            <h4>{this.props.teacher.occupation}</h4>
                        </div>
                        <div className="col-md-8">
                            <div className="col-md-12 text-left">
                                <hr/>
                                <h2><center><strong>Studies</strong></center></h2>
                                <hr/>
                                <ul>
                                    {this.props.teacher.studies.map((study, index) => ( <h4 key={'teacher_' + this.props.teacher._id + 'study_' + index}><li>{study.title}</li></h4> ))}
                                </ul>
                                <hr/>
                                <h2><center><strong>Classes Given</strong></center></h2>
                                <hr/>
                                <ul>
                                    {this.props.teacher.classes_given.map((term, index) => ( <h4  key={'teacher_' + this.props.teacher._id + 'class_given_' + index}><li>{term.name}</li></h4> ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}