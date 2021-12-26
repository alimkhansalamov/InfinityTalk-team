import { loadChats } from './Chat';

const initialState = {
  user: [],
  loading: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'users/profile/fetch/fulfilled':
      return {
        ...state,
        user: action.payload,
      };
    case 'users/profile/image/fulfilled':
      return {
        ...state,
        user: {
          ...state.user,
          img: action.payload,
        },
      };
    case 'user/profile/edit/fulfilled':
      return {
        ...state.user,
        user: action.payload
      }
    default:
      return state;
  }
};

export const fetchUserProfile = () => {
  return (dispatch) => {
    fetch("http://localhost:4000/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'users/profile/fetch/fulfilled', payload: data });
        dispatch(loadChats(data._id))
      });
  };
};

export const uploadAvatar = (file) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append('img', file);

    fetch('http://localhost:4000/users/updateImg', {
      method: 'PATCH',
      headers: {
        // "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'users/profile/image/fulfilled', payload: data });
      });
  };
};

export const editUserProfile = (
  name,
  surname,
  email,
  description,
  instagram,
  telegram,
  whatsapp
) => {
  const userInfo = {
    name,
    surname,
    email,
    description,
    instagram,
    telegram,
    whatsapp,
  };

  return (dispatch) => {
    fetch('http://localhost:4000/users/edit', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "user/profile/edit/fulfilled", payload: data });
      });
  };
};
