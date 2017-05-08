import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from '../question/question';

import {getMoreQuestions} from '../../store/actions';

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = dispatch => ({
  getMoreQuestions: payload => dispatch(getMoreQuestions(payload)),
});

class OrderBy extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const {getMoreQuestions, resetQuestions} = this.props;
    const option = e.target.value.split('.');
    const direction = option[1];
    const order = option[0];
    getMoreQuestions({direction, order, reset: true});
    return false;
  }

  render() {
    const {questions} = this.props;
    return (
      <div className="col-xs-5">
        <select
          className="form-control"
          name="order"
          id="orderBy"
          onChange={this.handleChange}
        >
          <option value="creationDate.desc">Creation Date (Desc)</option>
          <option value="creationDate.asc">Creation Date (Asc)</option>
          <option value="text.desc">Text (Desc)</option>
          <option value="text.asc">Text (Asc)</option>
        </select>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBy);
