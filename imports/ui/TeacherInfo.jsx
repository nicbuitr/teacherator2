import { Component } from 'react';

export default class TeacherInfo extends Component {
    render(){
        return(
            <div className="jumbotron teacher-info">
                <div className="container">
                    <div className="row">
                        <img src={this.props.teacher.profile_pic_url} className="teacher-profile-img inline-img-responsive" />
                        <h6><a className="caption" href={this.props.teacher.copyright}>{this.props.teacher.copyright} &copy; </a></h6>
                        <h2>{this.props.teacher.name}</h2>
                        <img src={'/'+this.props.teacher.avg_review+'_star.png'} className="inline-img-responsive rating-stars-img "/>
                        <hr/>
                        <div className="container">
                            <h4>{this.props.teacher.occupation}</h4>
                        </div>
                        <hr/>
                        <div className="text-left">
                            <h5><strong>Studies</strong></h5>
                            <ul>
                                {this.props.teacher.studies.map((study) => ( <li>{study.title}</li> ))}
                            </ul>
                        </div>
                        <hr/>
                        <div className="text-left">
                            <h5><strong>Classes given</strong></h5>
                            <ul>
                                {this.props.teacher.classes_given.map((term) => ( <li>{term.name}</li> ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}