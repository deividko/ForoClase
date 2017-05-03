import React, {Component} from 'react';
import {connect} from 'react-redux';

import Answers from './answers.js';
import AddAnswer from './addAnswer.js';
import ModalLock from '../modals/modalLockQuestion.js';



class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
    };
  }

  render() {
    const {question,closed} = this.props;
    const {collapse} = this.state; 

    const handleCollapseClick = (e) => {
      e.preventDefault();
      this.setState({
        collapse: !this.state.collapse,
      });
      return false;
    };

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className={`glyphicon glyphicon-${collapse ? 'plus' : 'minus'}`}
            style={{cursor: 'pointer'}}
            onClick={handleCollapseClick} />{' '}
          {question.text}
          < ModalLock questionId={question.id} />
        </div>
        {collapse ? null : <Answers  cerrado={question.close} question={question} loading />}
        {collapse ? null : question.close ? <AddAnswer question={question} cerrado={question.close} /> : <AddAnswer question={question} />}
      </div>
    );
  }
}
export default Question;
