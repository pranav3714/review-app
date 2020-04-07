//This is an example of React Native
//Pagination to Load More Data dynamically - Infinite List
import React, { Component } from 'react';
//import react in our code.

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
//import all the components we are going to use.
import apiKey from "../assets/key/tmdbKeys";
import ReviewListItem from "./ReviewListItem";
import voteAvgToArray from "../util";

export default class HomeScreen extends Component {
  constructor(navigatione) {
    super();
    this.state = {
      loading: false,
      isListEnd: false,
      //Loading state used while loading the data for the first time
      serverData: [],
      //Data Source for the FlatList
      fetching_from_server: false,
      //Loading state used while loading more data
    };
    this.offset = 1;
    this.navigation = navigatione
    //Index of the offset to load from web API
  }

  componentDidMount() {
    this.loadMoreData();
  }

  loadMoreData = () => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      //On click of Load More button We will call the web API again
      this.setState({ fetching_from_server: true }, () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?year=2020&with_original_language=en&include_adult=false&page=${this.offset}&api_key=${apiKey}`)
          //Sending the currect offset with get request
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.results.length > 0) {
              //Successful response from the API Call
              this.offset = this.offset + 1;
              //After the response increasing the offset for the next API call.
              this.setState({
                serverData: [...this.state.serverData, ...responseJson.results],
                //adding the new data with old one available
                fetching_from_server: false,
                //updating the loading state to false
              });
            } else {
              this.setState({
                fetching_from_server: false,
                isListEnd: true,
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
    }
  };

  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="white" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={{ width: '100%' }}
            keyExtractor={(item, index) => index}
            data={this.state.serverData}
            onEndReached={() => this.loadMoreData()}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => {
              //console.log(item.id);
              return (
                <ReviewListItem
                    key={item.id}
                    name={item.original_title}
                    description={item.overview}
                    rating={voteAvgToArray(item.vote_average)}
                    image={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
                    navigation={this.navigation}
                    id={item.id}
                />
              )
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={this.renderFooter.bind(this)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      margin: 0,
      padding: 0,
      backgroundColor: "#b03160"
  },
  item: {
    padding: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
