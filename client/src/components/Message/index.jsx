import React, { useEffect, useRef, useState } from 'react';
import './Message.css'
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket';
import { newMessage } from '../../redux/features/Chat';

const Message = () => {
  const [messageValue, setMessageValue] = useState('');
  const [search, setSearch] = useState('');
  const user = useSelector((state) => state.userProfile.user._id);
  const messagesRef = useRef(null);

  const dispatch = useDispatch()
  const mainUser = useSelector((state) => state.userProfile.user);
  const chats = useSelector((state) => state.chat.userChats);
  const isAnyChatSelected = useSelector((state) => state.chat.userChats.some((chat) => chat.selected))
  const selectedChat = useSelector((state) => state.chat.userChats.find((chat) => chat.selected))

  const onSendMessage = () => {
    // socket.emit('ROOM:NEW_MESSAGE', {
    //   user,
    //   roomId: selectedChat._id,
    //   text: messageValue,
    // });
    dispatch(newMessage(selectedChat._id, user, messageValue.trim()))
    // dispatch({
    //   type: 'NEW_MESSAGE',
    //   payload: { chatId: selectedChat._id, user, text: messageValue },
    // });
    setMessageValue('');
  };

  const onKeySendMessage = (e) => {
    if (messageValue.trim() !== '' && e.key === 'Enter') {
      dispatch(newMessage(selectedChat._id, user, messageValue.trim()))
      setMessageValue('');
    }
  };

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  // useEffect(() => {
  //   socket.on('ROOM:NEW_MESSAGE', addMessage);
  // }, []);
  // window.socket = socket;

  useEffect(() => {
    if (selectedChat) {
      messagesRef.current.scrollTo(0, 99999);
    }
  }, [selectedChat]);

  const handleChatItemClick = (id) => {
    dispatch({type: 'chat/select/fulfilled', payload: id})
    setSearch('')
  }

  let filteredChats = chats;
  if (search) {
    filteredChats = chats.filter((chat) => {
      if (chat.members[0]._id === mainUser._id) {
        return chat.members[1].name.toLowerCase().match(search.toLowerCase())
      } else {
        return chat.members[0].name.toLowerCase().match(search.toLowerCase())
      }
    });
  }

  return (
    <div className='main-cont'>
    <div className='main'>

      <div className='chats-list'>
        <div className='search'>
          <input disabled={chats.length === 0} type="text" value={search} onChange={(ev) => setSearch(ev.target.value)} placeholder='Search...'/>
        </div>
        { chats.length === 0 ? (
            <div className="emo-wrap">
              <div className="emo-empty">🧭</div>
              <span>У вас нет ни одного начатого диалога :-(</span><br/>
              <span>Найдите собеседника на странице Партнёры.</span>
            </div>
          ) : (
          filteredChats.map((chat) => {
            return (
              <div className={`chats-item ${chat.selected ? 'selected-chat' : ''}`} onClick={() => handleChatItemClick(chat._id)}>
                <img src={chat.members[0]._id === mainUser._id ? (chat.members[1].img ? `http://localhost:4000/${chat.members[1].img}` : "http://localhost:4000/uploads/default-photo.png") : (chat.members[0].img ? `http://localhost:4000/${chat.members[0].img}` : "http://localhost:4000/uploads/default-photo.png")} className='img-locu' alt=""/>
                <div className='text-of-label'>
                  <span className='partner-name'>{chat.members[0]._id === mainUser._id ? chat.members[1].name : chat.members[0].name}</span> <br/>
                  <span className='last-msg'>{chat.messages.length ? chat.messages[chat.messages.length-1].text.slice(0,10) + '...' : 'Начните чат...'}</span>
                </div>

              </div>)
          }))
        }
      </div>
      <div className='selected-chat-body'>
        {!isAnyChatSelected ?
          (<div className='please-choose'>
            <img src="https://botostore.com/netcat_files/22/26/preview_27011_1542527165.jpg" alt=""/> <br/>
            <span>Пожалуйста, выберите чат, чтобы начать общение...</span>
          </div>)
          : selectedChat.messages.length ?
          (<div ref={messagesRef} className='messages-container'>
            {
              selectedChat.messages.map((message) => {
                return (
                  <div className='message-cont'>
                    <div className={`message ${mainUser._id === message.user ? 'my-msg' : ''}`}>
                      <span className='text-mes'>
                        {message.text}
                      </span>
                    </div>
                  </div>)
              })
            }


        </div>) : (
          <div className='no-messages' ref={messagesRef}>
            <img src="https://cdndelivr.com/stickerset/tvig_vk/2/webp" alt=""/><br/>
            <span>В этом чате пока нет сообщений.</span>
          </div>)}
        <div className='input-container'>
          <input disabled={!isAnyChatSelected} onKeyPress={onKeySendMessage} type="text" value={messageValue} placeholder='Введите сообщение..' onChange={(ev) => setMessageValue(ev.target.value)}/>
          <button disabled={messageValue.trim() === ''} className='btn btn-primary' onClick={onSendMessage}>Send</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Message;
