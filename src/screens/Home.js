import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Container, H1} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from '../actions/post';
import EmptyContainer from '../components/EmptyContainer';
import Post from '../components/Post';

const Home = ({getPosts, postState, userDetails}) => {
  useEffect(() => {
    getPosts();
  }, []);

  if (postState.loading) {
    return <EmptyContainer />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={postState.posts}
        keyExtractor={(item) => item.id}
        renderItem={({item, index, seperators}) => (
          <Post item={item} userDetails={userDetails} key={item.id} />
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1>No posts found</H1>
          </Container>
        )}
      />
    </SafeAreaView>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  postState: PropTypes.object.isRequired,
  userDetails: PropTypes.object,
};

const mapStateToProps = (state) => ({
  postState: state.post,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    justifyContent: 'flex-start',
    padding: 4,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
