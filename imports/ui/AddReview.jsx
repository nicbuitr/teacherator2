import { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Teacher extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            criterias:[{
                selection:0,
                description:'Uses different approaches of teaching'
            },
            {
                selection:0,
                description:'Always willing to help the students'
            },
            {
                selection:0,
                description:'Work load from projects, lectures, etc. is moderate'
            },
            {
                selection:0,
                description:'Evaluation is according to what is taught'
            },
            {
                selection:0,
                description:'Well organized and punctual'
            },
            ],
            totalScore:0,
            comments:'',
            createdAt:'',
        };
    }

    componentDidMount(){
        window.location.replace('#teacher-reviews-div');
    }

    addReview(e){
        e.preventDefault();
        this.state.createdAt = new Date();      
        Meteor.call('teachers.addReview', this.props.teacher._id, this.state);
        this.props.teacher.reviews.push(this.state);
        var criterias = this.state.criterias;

        //Reinitialize for a new review
        this.state.totalScore = 0;
        document.getElementById('stars-img').src ='/0_star.png';
        for (var i = 1; i <= criterias.length; i++) {
            document.getElementById('criteria_'+i).checked = false;
            criterias[i-1].selection = 0;
        }         
        document.getElementById('comments').value = '';
        this.setState({comments: ''});
        window.location.replace('#reviews-div');
    }

    handleInputChange(e){
        var state = this.state;
        var name = e.target.name;
        var criterias = this.state.criterias;
        var stateValue = 0;
      
        if(name === 'comments'){
            e.preventDefault();
            state.comments = e.target.value;
        }
        else{
            if (e.target.checked) {
                this.state.totalScore++;
                stateValue = 1;
            }
            else{
                this.state.totalScore--;
            }
            criterias[name.split('_')[1]-1].selection = stateValue;
        }

        let starsImage = document.getElementById('stars-img');
        starsImage.src = '/' + this.state.totalScore + '_star.png';
        starsImage.alt = this.state.totalScore + ' stars image for review to add.';
        this.setState(state);
    }

    render(){
        var rows = [];
        var criterias = this.state.criterias;
        for (var i = 0; i < criterias.length; i++) {
            rows.push(
            <div className='form-group' key={'criteria_form_group_'+(i+1)}>
              <div className='row' key={'criteria_row_'+(i+1)}>
                <div className='col-md-11' key={'criteria_label_'+(i+1)}>
                  <label className='control-label' key={'criteria_control_label_'+(i+1)} htmlFor={'criteria_'+(i+1)}>{criterias[i].description}</label>
                </div>
                <div className='col-md-1 text-right' key={'criteria_text_right_'+(i+1)}> 
                  <input type='checkbox' className='criteria-checkbox' key={'criteria_checkbox'+(i+1)} id={'criteria_'+(i+1)} name={'criteria_'+(i+1)} value={criterias[i].selection} onChange={this.handleInputChange.bind(this)} />
                </div>
              </div>
            </div>
          );
        }
        return(
          <div className='jumbotron'>
            <div className='row text-center'>
              <h2>Add Review By Choosing The Options That Apply</h2>
              <hr/>
            </div>
            <form className='form' onSubmit={this.addReview.bind(this)}>
              {rows}               
              <div className='form-group'>
                <label className='control-label' htmlFor='comments'>Suggestions, compliments, rants or comments:</label>
                <textarea className='form-control' rows='5' id='comments' name='comments' value={this.state.comments} onChange={this.handleInputChange.bind(this)} placeholder='Write here any suggestion, compliment, rant or comment you may have...'></textarea>                    
              </div>
              <hr/>
                <div className='text-center'>
                  <img src='/0_star.png' className='inline-img-responsive rating-stars-img ' id='stars-img' name='stars-img' alt={'0 stars image for review to add.'}/>
                </div>
              <hr/>
              <div className='form-group text-center'>
                <button className='btn-lg btn-add-review' type='submit'  id='reviews-div'>Add Review</button>
              </div>
            </form>
          </div>
        );
    }
}