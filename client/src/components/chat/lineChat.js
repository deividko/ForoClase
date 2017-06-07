import React, {Component} from 'react';
import {connect} from 'react-redux';

// our packages
import {sendMessage} from '../../store/actions';

const mapStateToProps = (state) => ({
  chat: state.chats,
  specificchat: state.chats.specificchat,
});

const mapDispatchToProps = (dispatch) => ({
  doSendMessage: payload => dispatch(sendMessage(payload)),
});

class LineChat extends Component {

  constructor(props) {
    super(props);
  }

  render() {

  const {chat, specificchat, doSendMessage} = this.props;

  let chatMessage;

  const handleMessageClick = (e) => {
    e.preventDefault();
    doSendMessage({specificchat, message: chatMessage.value});
    chatMessage.value = '';
    return false;
  };

  return (
    <div>
      <div className="panel panel-default" style={{witdh: 20}} >

          {specificchat ? specificchat.messages.map(message => (
          <div key={message.id} className="panel-heading" >
        {message.message}
        <span className="pull-right">{message.user} </span>
          </div>
        )) : null}

      </div>

      <div>
        <form>
          <div className="form-group">
            <label htmlFor="chatMessage"></label>
            <input
              type="text"
              className="form-control"
              id="chatMessage"
              placeholder="Chat message"
              ref={(t) => { chatMessage = t; }}
            />
          </div>
          <button type="submit" className="btn btn-default" onClick={handleMessageClick}>
          Send Message
          </button>
        </form>
      </div>
    </div>


  );
}
};

export default connect(mapStateToProps, mapDispatchToProps)(LineChat);
