// npm packages
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Chat, CreateChat} from '../../components/chat';
import {getAllChats} from '../../store/actions';


const mapStateToProps = (state) => ({
  chats: state.chats.chats,
});

const mapDispatchToProps = (dispatch) => ({
  fetchChats: _.once(() => dispatch(getAllChats())),
});
const ChatList = ({fetchChats, chats}) => {

  fetchChats();

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
