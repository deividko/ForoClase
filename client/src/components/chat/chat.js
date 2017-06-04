import React, {Component} from 'react';
import {connect} from 'react-redux';
import {joinChat} from '../../store/actions';

const mapStateToProps = (state, {chat}) => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  doJoinChat: payload => dispatch(joinChat(payload))
});

class Chat extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {chat, doJoinChat} = this.props;

    const handleJoinClick = (e) => {
        e.preventDefault();
       doJoinChat({chat})
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {chat.title}
          <button className="btn btn-xs btn-info pull-right" onClick={handleJoinClick}>Join Chat</button>
        </div>
      </div>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
