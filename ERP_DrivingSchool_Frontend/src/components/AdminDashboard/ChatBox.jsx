import React from 'react';
import MDSpinner from 'react-md-spinner';
import config from '../../config';

const ChatBox = ({ chat, chatIsLoading }) => {
  if (chatIsLoading) {
    return (
      <div className='col-xl-12 my-auto text-center'>
        <MDSpinner size='72' />
      </div>
    );
  } else {
    return (
      <div className='col-xl-12'>
        {chat.map((message) => {
          console.log(message);
          return (
            <div key={message.id} className='message'>
              <div
                className={`${message.receiverId !== config.agentUID ? 'balon1' : 'balon2'} p-3 m-1`}
              >
                {message.text}
              </div>
            </div>
          );
        })}
      </div>

    );
  }
};

export default ChatBox;
