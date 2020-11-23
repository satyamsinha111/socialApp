import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';

export const signUp = (data) => async (dispatch) => {
  console.log(data);
  const {name, instaUserName, bio, email, password, country, image} = data;
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      console.log(data);
      console.log('User creation successs');
      database()
        .ref('/users/' + data.user.uid)
        .set({
          name,
          instaUserName,
          country,
          image,
          bio,
          uid: data.user.uid,
        })
        .then((data) => console.log('DATA SET SUCCESS'));
      Snackbar.show({
        text: 'Account created',
        textColor: '#fff',
        backgroundColor: '#1b262c',
      });
    })
    .catch((error) => {
      console.error(error);
      Snackbar.show({
        text: 'Signup failed',
      });
    });
};

export const signIn = (data) => async (dispatch) => {
  //
  console.log(data);
  const {email, password} = data;
  auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      //
      console.log(data);
      console.log('Success signin');
      Snackbar.show({
        text: 'Signin success',
        textColor: '#fff',
        backgroundColor: 'green',
      });
    })
    .catch((error) => {
      //
      console.error(error);
      Snackbar.show({
        text: 'Signin failed',
        textColor: '#fff',
        backgroundColor: 'red',
      });
    });
};

export const signOut = () => async (dispatch) => {
  auth()
    .signOut()
    .then((data) => {
      Snackbar.show({
        text: 'Signed out',
        textColor: '#fff',
        backgroundColor: 'red',
      });
    })
    .catch((error) => {
      console.error(error);
      Snackbar.show({
        text: 'Signout failed',
        textColor: '#fff',
        backgroundColor: 'red',
      });
    });
};
