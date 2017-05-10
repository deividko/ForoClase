import React, {Component} from 'react';
import {connect} from 'react-redux';

import Answers from './answers.js';
import AddAnswer from './addAnswer.js';
import ModalLock from '../modals/modalLockQuestion.js';
import {deleteQuestionAction, getUserAction} from '../../store/actions';

const mapStateToProps = state => ({
  userAuth: state.auth.user,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  deleteQuestion: payload => dispatch(deleteQuestionAction(payload)),
  getUser: payload => dispatch(getUserAction(payload)),
});

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
    };
  }


  render() {
    const {question, closed, user, userAuth, deleteQuestion} = this.props;
    const {collapse} = this.state;

    const handleCollapseClick = (e) => {
      e.preventDefault();
      this.setState({
        collapse: !this.state.collapse,
      });
      return false;
    };

    const handleDelete = e => {
       e.preventDefault();
       deleteQuestion({id: question.id});
       return false;
     }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className={`glyphicon glyphicon-${collapse ? 'plus' : 'minus'}`}
            style={{cursor: 'pointer'}}
            onClick={handleCollapseClick} />{' '}
          {question.text}
          < ModalLock questionId={question.id} />
          {!question.close ?
              question.owner === userAuth.id ?
                <button
                  className="btn btn-default glyphicon glyphicon-trash btn-danger pull-right"
                  onClick={handleDelete}>
                </button>
               : null
            : null}
        </div>
        {collapse ? null : <Answers  cerrado={question.close} question={question} loading />}
        {collapse ? null : question.close ? <AddAnswer question={question} cerrado={question.close} /> : <AddAnswer question={question} />}
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Question);
