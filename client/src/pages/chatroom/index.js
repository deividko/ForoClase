// npm packages
import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {LineChat} from '../../components/chat';
import {getOneChat} from '../../store/actions';
import {addObservable, removeObservable} from '../../store/actions';
import {registerChatObservable} from '../../store/realtime'


const mapStateToProps = (state, {specificchat}) => ({
  specificchat: state.chats.specificchat,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  onSeeCompleteChat: params => dispatch(getOneChat(params)),
  addObservable: observable => dispatch(addObservable(observable)),
  removeObservable: (observable, specificchat) => dispatch(removeObservable({observable, specificchat})),
});
class ChatRoom extends Component {

  constructor(props) {
    super(props);
      const {specificchat, onSeeCompleteChat, routeParams, addObservable} = this.props;
      onSeeCompleteChat({
        id: routeParams.id,
      });
      const {payload: observable} = addObservable(registerChatObservable(routeParams.id));
      this.state = {
        observable,
      };
  }

  componentWillUnmount() {
    const {removeObservable, specificchat} = this.props;
    const {observable} = this.state;
    removeObservable(observable, specificchat);
  }

  render() {
      const {specificchat, user, } = this.props;
      return (
      <div className="containerPaper">
          <div>
            <LineChat user={user} specificchat={specificchat} />
          </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
