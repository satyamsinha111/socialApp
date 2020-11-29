import database from '@react-native-firebase/database';
import {SET_COMMENT, ERROR_COMMENT} from './action.type';

export const getComments = (postId) => async (dispatch) => {
  try {
    database()
      .ref(`/posts/${postId}/comment/`)
      .on('value', (snapshot) => {
        // console.log('Response', Object.values(snapshot.val()));
        if (snapshot.val()) {
          dispatch({
            type: SET_COMMENT,
            payload: Object.values(snapshot.val()),
          });
        } else {
          dispatch({
            type: SET_COMMENT,
            payload: [],
          });
        }
      });
  } catch (error) {
    dispatch({type: ERROR_COMMENT});
  }
};
