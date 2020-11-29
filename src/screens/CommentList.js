import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Input,
  Button,
  Icon,
  List,
  ListItem,
  H1,
} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getComments} from '../actions/comment';
import database from '@react-native-firebase/database';
import shortid from 'shortid';
import Comment from '../components/Comment';
import EmptyContainer from '../components/EmptyContainer';
import {useIsFocused} from '@react-navigation/native';

const CommentList = (props) => {
  const [commentList, setCommentList] = useState(null);
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const isFocus = useIsFocused();
  useEffect(() => {
    // console.log(props);
    console.log(props.route.params.id);
    props.getComments(props.route.params.id).then(() => {
      console.log('Done');
      setCommentList(props.commentState.comments);
      console.log(props.commentState.comments);
    });
  }, [toggle, isFocus]);

  const commentPost = (comment) => {
    const id = shortid.generate();
    database()
      .ref(`/posts/${props.route.params.id}/comment/${id}`)
      .set({
        comment: comment,
        user: props.user.uid,
        userImage: props.user.image,
        id: id,
      })
      .then(() => {
        setToggle(!toggle);
      });
  };

  // if (loading) {
  //   return <EmptyContainer />;
  // }

  return (
    <Container style={styles.Wrapper}>
      <Header style={{backgroundColor: '#03506f'}}>
        <Body style={styles.HeaderContainer}>
          <Title>Comments</Title>
        </Body>
      </Header>
      <View style={styles.List}>
        <FlatList
          data={props.commentState.comments}
          keyExtractor={(comment) => {
            // console.log('Comments ', comment);
            return comment.id;
          }}
          renderItem={({item, index, seperators}) => {
            console.log('I got', item);
            return <Comment comment={item} />;
          }}
          ListEmptyComponent={() => (
            <Container style={styles.emptyContainer}>
              <H1 style={{color: '#fff'}}>No comment found</H1>
            </Container>
          )}
        />
      </View>
      <View style={styles.Form}>
        <Input
          placeholder="Comment"
          onChangeText={(comment) => {
            setComment(comment);
          }}
          defaultValue={comment}
          onSubmitEditing={() => {
            commentPost(comment);
            setComment(null);
          }}
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: '#e8e8e8',
            height: 48,
          }}
        />
      </View>
    </Container>
  );
};

CommentList.propTypes = {
  getComments: PropTypes.func.isRequired,
  commentState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  commentState: state.comment,
  user: state.auth.user,
});

const mapDispatchToProps = {
  getComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);

const styles = StyleSheet.create({
  HeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Wrapper: {
    flex: 1,
    backgroundColor: '#222831',
  },
  List: {
    flex: 13,
    // backgroundColor: 'red',
    padding: 10,
  },
  Form: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'blue',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
