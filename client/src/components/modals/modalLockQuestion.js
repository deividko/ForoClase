import React, {Component} from 'react';
import Modal from 'react-modal';
import {closeQuestion} from '../../store/actions';
import {connect} from 'react-redux';


const customStyles = {
  overlay: {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(40, 39, 39, 0.7)',
    zIndex            : 4,
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


const mapDispatchToProps = dispatch => ({
 closeQuestion: payload => dispatch(closeQuestion(payload)),

});


class LockQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {

    const {closeQuestion, questionId}=this.props;
    const handleLockQuestion = (e) => {
      e.preventDefault();
      this.closeModal();
      this.props.closeQuestion({
        questionId,
      });
      //accion de bloquear la pregunta
    };

    return (
      <span>
      <center>
        <button type="submit" style={{marginLeft: '10px'}} className="btn btn-sm pull-right" onClick={this.openModal}>
          <span className={`glyphicon glyphicon-lock`} />
        </button>
      </center>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div className="container">
          <a className="glyphicon glyphicon-remove pull-right" role="button" onClick={this.closeModal} />
          <h4> Are you sure that you want to lock the question? </h4>
          <span>
            <button type="submit" className="btn btn-danger" onClick={this.closeModal} style={{marginRight: '2%'}}>No</button>
            <button type="submit" className="btn btn-success" onClick={handleLockQuestion}>Yes</button>
          </span>
        </div>
        </Modal>
      </span>
    );
  }
}

export default connect(null,mapDispatchToProps)(LockQuestion);
