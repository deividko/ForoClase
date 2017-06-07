import React, {Component} from 'react';
import {connect} from 'react-redux';
import {joinChat, deleteChat} from '../../store/actions';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import {addObservable, removeObservable} from '../../store/actions';
import {registerChatObservable} from '../../store/realtime';

const mapStateToProps = (state, {chat}) => ({
  login: state.auth.user,
  follower: state.chats.follower || null,
});

const mapDispatchToProps = dispatch => ({
  doJoinChat: payload => dispatch(joinChat(payload)),
  doDeleteChat: payload => dispatch(deleteChat(payload)),
  navToCompleteChat: id => dispatch(push(`/chat/${id}`)),
});

class Chat extends Component {

  constructor(props) {
    super(props);
  };

  render() {

    const {user, login, chat, doJoinChat, doDeleteChat, follower, navToCompleteChat } = this.props;

    const handleJoinClick = (e) => {
        e.preventDefault();
       doJoinChat({chat})
    }

    const handleDeleteClick = (e) => {
       e.preventDefault();
       doDeleteChat({chat})
   }

   const handleSeeCompleteChat = (e) => {
      e.preventDefault();
      navToCompleteChat(chat.id);
  }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {chat.title}
          {login.id && chat.ownerId && login.id !== chat.ownerId ?
            <button className="btn btn-xs btn-info pull-right" onClick={handleJoinClick}>Join Chat</button>
            : <button className="btn btn-xs btn-danger pull-right" onClick={(e) => handleDeleteClick(e)} >
              <span className="glyphicon glyphicon-trash action-icon" />
            </button>}
          {login.id && chat.ownerId && login.id === chat.ownerId ?
            <button className="btn btn-xs btn-info pull-right" onClick={handleSeeCompleteChat} style={{marginRight: '10px'}}>Enter Chat</button>
            : null}
          {follower ? follower.map(f => (
            f.id === chat.id ?
            <button key={f.id}className="btn btn-xs btn-info pull-right" onClick={handleSeeCompleteChat} style={{marginRight: '10px'}}>Enter Chat</button>
            : null
          )) : null}

        </div>
      </div>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
