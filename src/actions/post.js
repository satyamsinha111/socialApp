import database from '@react-native-firebase/database';
import {SET_POST, ERROR_POST} from './action.type';

export const getPosts = (data) => async (dispatch) => {
  try {
    database()
      .ref('/posts/')
      .on('value', (snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val()) {
          dispatch({
            type: SET_POST,
            payload: Object.values(snapshot.val()),
          });
        } else {
          dispatch({
            type: SET_POST,
            payload: [],
          });
        }
      });
  } catch (error) {
    dispatch({
      type: ERROR_POST,
    });
  }
};
