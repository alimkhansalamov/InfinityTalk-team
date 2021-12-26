import { fetchUserProfile } from './ProfileReducer';
import socket from '../../socket';

const initialState = {
  userChats: [],
  creating: false
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "chat/create/fulfilled":
      return {
        ...state,
        userChats: [...state.userChats, action.payload]
      };
    case "chat/load/fulfilled":
      return {
        ...state,
        userChats: action.payload
      };
    case "NEW_MESSAGE":
      return {
        ...state,
        userChats: state.userChats.map((chat) => {
          if (chat._id === action.payload.chatId) {
            return {...chat, messages: [...chat.messages, {user: action.payload.user, text: action.payload.text}]}
          }
          return chat;
        })
      };
    case "chat/select/fulfilled":
      return {
        ...state,
        userChats: state.userChats.map((chat) => {
          if (chat._id === action.payload) {
            return {...chat, selected: true}
          }
          return {...chat, selected: false};
        })
      };
    default:
      return state;
  }
};

export const startChat = (mainUser, partner) => {
  const members = [mainUser, partner]
  return async (dispatch) => {
    const res = await fetch("http://localhost:4000/chats/", {
      method: "POST",
      body: JSON.stringify({
        members
      }),
      headers: { "Content-type": "application/json" },
    });
    const chat = await res.json();
    dispatch({
      type: "chat/create/fulfilled",
      payload: chat,
    });
  };
};

export const loadChats = (mainUserId) => {
  return async (dispatch) => {
    const res = await fetch(`http://localhost:4000/chats/user/${mainUserId}`);
    const chats = await res.json();
    dispatch({
      type: "chat/load/fulfilled",
      payload: chats,
    });
    window.socket = socket;
    //socket.emit('ROOM:JOIN', chats.map((chat) => chat._id));
  };
};

export const newMessage = (chatId, user, text) => {
  return async (dispatch) => {
    await fetch(`http://localhost:4000/chats/${chatId}`, {
      method: "PATCH",
      body: JSON.stringify({
        messages: {text, user}
      }),
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        dispatch({
          type: 'NEW_MESSAGE',
          payload: { chatId, user, text },
        });
      }
    })
    //socket.emit('ROOM:JOIN', chats.map((chat) => chat._id));
  };
};
