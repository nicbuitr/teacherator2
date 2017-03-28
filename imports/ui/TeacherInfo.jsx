import React, { Component, PropTypes } from 'react';

export default class TeacherInfo extends Component {
    render(){
        return(
            <div className="jumbotron teacher-info">
                <div className="container">
                    <div className="row">
                        <img src={this.props.teacher.profile_pic_url} className="teacher-profile-img inline-img-responsive" />
                        <h6><a className="caption" href="http://marvel.com/universe/Professor_X">&copy; Marvel</a></h6>
                        <h2>{this.props.teacher.name}</h2>
                        <img src={"/"+this.props.teacher.avg_review+"_star.png"} className="inline-img-responsive rating-stars-img "/>
                        <hr/>
                        <div className="container">
                            <h4>{this.props.teacher.occupation}</h4>
                        </div>
                        <hr/>
                        <div className="text-left">
                            <h5><strong>Studies</strong></h5>
                            <ul>
                                <li>
                                    Ph.D in Genetics
                                </li>
                                <li>
                                    Ph.D in Biophysics
                                </li>
                                <li>
                                    Ph.D in Psychology
                                </li>
                                <li>
                                    Ph.D in Anthropology
                                </li>
                                <li>
                                    M.D. in Psychiatry
                                </li>
                            </ul>
                        </div>
                        <hr/>
                        <div className="text-left">
                            <h5><strong>Classes given</strong></h5>
                            <ul>
                                <li>
                                    Genetics 101
                                </li>
                                <li>
                                    Introduction to Biophysics
                                </li>
                                <li>
                                    Psychology of the Gifted
                                </li>
                                <li>
                                    Anthropology Basics
                                </li>
                                <li>
                                    Psychiatry for the Ill Minded
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}