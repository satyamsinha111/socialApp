import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect, useDispatch} from 'react-redux';
import AddPost from './screens/AddPost';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import Home from './screens/Home';
import CustomHeader from './layout/CustomHeader';
import {SET_USER, IS_AUTHENTICATED} from './actions/action.type';
import database from '@react-native-firebase/database';
import EmptyContainer from './components/EmptyContainer';
import {requestPermission} from './utils/AskPermison';

const Stack = createStackNavigator();

const App = ({authState}) => {
  const dispatch = useDispatch();
  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });
      console.log(user._user.uid);
      database()
        .ref(`/users/${user._user.uid}`)
        .on('value', (snapshot) => {
          console.log('USER DETAIS', snapshot.val());
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    requestPermission();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <View>
      <Text>Helloworld</Text>
    </View>
  );
};

export default App;
