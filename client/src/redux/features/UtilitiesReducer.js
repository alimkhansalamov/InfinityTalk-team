const initialState = {
  utilities: [],
  loading: false,
};

export const utilitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'utilities/load/pending':
      return {
        ...state,
        loading: true,
      };

    case 'utilities/load/fulfilled':
      return {
        ...state,
        utilities: action.payload,
        loading: false,
      };

    case 'utilities/load/all':
      return {
        ...state,
        utilities: action.payload,
        loading: false,
      };

    // case "utilities/english":
    //   return { ...state, ... , loading: false,};
    //
    // case "utilities/russian":
    //   return { ...state, ... , loading: false,};
    //
    // case "utilities/french":
    //   return { ...state, ... , loading: false,};
    //
    // case "utilities/german":
    //   return { ...state, ... , loading: false,};
    //
    // case "utilities/arabic":
    //   return { ...state, ... , loading: false,};
    //
    // case "utilities/spanish":
    //   return { ...state, ... , loading: false,};

    default:
      return state;
  }
};

export const loadUtilities = () => {
  return (dispatch) => {
    dispatch({ type: 'utilities/load/pending' });

    fetch('http://localhost:4000/utilities')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'utilities/load/fulfilled', payload: data });
      });
  };
};
