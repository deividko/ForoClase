// npm packages
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Chat, CreateChat} from '../../components/chat';
import {getAllChats, getFollowers} from '../../store/actions';


const mapStateToProps = (state) => ({
  chats: state.chats.chats,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchChats: _.once(() => dispatch(getAllChats())),
  doGetFollowers: _.once((userId) => dispatch(getFollowers(userId))),
});

const ChatList = ({fetchChats, doGetFollowers, chats, user}) => {

  fetchChats();
  doGetFollowers(user.id);

  return (
    <div>
      <div>
      {chats.map(chat => (
        <Chat key={chat.id} chat={chat} />
      ))}
      </div>
      <div>
        <CreateChat />
      </div>
    </div>
  );

}
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
