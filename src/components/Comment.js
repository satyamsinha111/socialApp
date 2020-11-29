import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Card, Left, Right} from 'native-base';

const Comment = (props) => {
  useEffect(() => {
    console.log('Inside', props.comment);
  }, []);
  return (
    <Card style={styles.commentContainer}>
      <Image
        style={{margin: 10}}
        source={{uri: props.comment.userImage, width: 50, height: 50}}
      />
      <View style={styles.textContainer}>
        <Text
          style={{
            fontSize: 17,
            letterSpacing: 2,
          }}>
          {' '}
          {props.comment.comment}{' '}
        </Text>
      </View>
    </Card>
  );
};

export default Comment;

const styles = StyleSheet.create({
  commentContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
