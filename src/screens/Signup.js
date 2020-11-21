import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {
  Container,
  Form,
  Item,
  Input,
  Text,
  Button,
  Thumbnail,
  Content,
} from 'native-base';

import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';
import ImagePicker from 'react-native-image-picker';
import {options} from '../utils/Options';
import PropTypes from 'prop-types';
import {Signup} from '../actions/auth';
import {connect} from 'react-redux';

const SignUp = ({signUp}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instaUserName, setInstaUserName] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(
    'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png',
  );
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  return (
    <View>
      <Text>Signup</Text>
    </View>
  );
};

const mapDispatchToProps = {
  signUp: (data) => signUp(data),
};

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUp);
