import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getConversationChat, sendText} from '../../store/actions';

const mapStateToProps = state => ({
  chats: state.chat.chat,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  fetchConversation: () => dispatch(getConversationChat()),
  doSendText: payload => dispatch(sendText(payload)),
});

class ChatRoom extends Component {


  componentWillMount() {
    this.props.fetchConversation();
  }

  render() {
    let chatText;

    const {doSendText, chats} = this.props;

    const handleSendText = (e) => {
      e.preventDefault();
      const conversation = chatText.value;

      doSendText({conversation});

      return false;
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {chats.map((chat, i) => (
              <h4 key={i}>{chat.conversation}</h4>
            ))}
          </div>
          <div className="col-md-3">
            <h3>Participantes</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Text here..."
                id="chatText"
                ref={(t) => { chatText = t; }}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-default"
                  onClick={handleSendText}
                  type="button">Send!
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
