import {SET_COMMENT, ERROR_COMMENT} from '../actions/action.type';

const initialState = {
  comments: null,
  loading: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        error: false,
      };
    case ERROR_COMMENT:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
