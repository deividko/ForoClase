import React, {Component} from 'react';
import {connect} from 'react-redux';
import {joinChat, deleteChat} from '../../store/actions';

const mapStateToProps = (state, {chat}) => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  doJoinChat: payload => dispatch(joinChat(payload)),
  doDeleteChat: payload => dispatch(deleteChat(payload)),
});

class Chat extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {user, chat, doJoinChat, doDeleteChat} = this.props;

    const handleJoinClick = (e) => {
        e.preventDefault();
       doJoinChat({chat})
    }

    const handleDeleteClick = (e) => {
       e.preventDefault();
       doDeleteChat({chat})
   }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {chat.title}
          {user.id && chat.ownerId && user.id !== chat.ownerId ?
            <button className="btn btn-xs btn-info pull-right" onClick={handleJoinClick}>Join Chat</button>
          : null}
          {user.id && chat.ownerId && user.id === chat.ownerId ?
            <button className="btn btn-xs btn-danger pull-right" onClick={(e) => handleDeleteClick(e)} >
              <span className="glyphicon glyphicon-trash action-icon" />
            </button>
          : null}
        </div>
      </div>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
