// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';

// our packages
import {createChat} from '../../store/actions';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  doCreateChat: payload => dispatch(createChat(payload)),
});


const CreateChat = ({doCreateChat}) => {
  let chatTitle;

  const handleCreateChat = (e) => {
    e.preventDefault();

    const title = chatTitle.value;

    doCreateChat({title});

    return false;
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="chatTitle">Chat Title</label>
          <input
            type="text"
            className="form-control"
            id="chatTitle"
            placeholder="Chat title"
            ref={(t) => { chatTitle = t; }}
          />
        </div>
        <button type="submit" className="btn btn-default" onClick={handleCreateChat}>
          Create new chat
        </button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChat);
