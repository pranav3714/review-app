import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Modal,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
const { vw, vh, vmin, vmax } = require('react-native-viewport-units');
import { WebView } from "react-native-webview";
import CommentInputPanel from "./CommentInputPanel";
import UserComments from "./UserComments";
import { FlatList } from 'react-native-gesture-handler';
import axios from "axios";
import apiKey from "../assets/key/tmdbKeys";
import Login from "./Login";
import baseUrl from "../assets/config/config";

const ReviewDetailsScreen: () => React$Node = ({ navigation, route }) => {
    const [comments, setComments] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [videoLink, setVideoLink] = useState("")
    const [modalShown, setModalShown] = useState(false)
    const [commentsLoding, setCommentsLoading] = useState(true)
    let getComments = async () => {
        let queryString = `${baseUrl}/comments/movie/${route.params.id}`, comments = await axios.get(queryString)
        setComments(comments.data.reverse())
        //console.log(comments.data);
        setCommentsLoading(false)
    }
    let getVideo = async () => {
        let videoData = await axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}/videos?api_key=${apiKey}`)
        setVideoLink(videoData.data.results[0].key)
    }
    useEffect(() => {
        let asyncDataGather = async () => {
          let memToken = await AsyncStorage.getItem('token')
          if(memToken !== null) {
            //console.log(memToken);
            setIsLoggedIn(true)
          }
        }
        asyncDataGather()
        //console.log(route.params)
        navigation.setOptions({
            title: (route.params.name.trim().length > 27) ? route.params.name.trim().slice(0, 27) + "..." : route.params.name.trim()
        })

        getComments()
        getVideo()
        //request to the server
        //https://www.youtube.com/watch?v=xjDjIWPwcPU
    }, [route.params?.post]);
    let closeModal = () => {
        setModalShown(false)
    }
    let loginToggle = () => {
      setIsLoggedIn(true)
    }

    return (
        <ScrollView>
          <View>
          <Login visible={modalShown} cancelModal={closeModal} loginChange={loginToggle}></Login>
            <View style={styles.container}>
                <View style={styles.videoView}>
                    <WebView
                        style={{ flex: 1 }}
                        javaScriptEnabled={true}
                        source={{ uri: `https://www.youtube.com/embed/${videoLink}?rel=0` }}
                    />
                </View>
                <View style={styles.commentView}>
                    <Text style={{ color: "white", fontSize: 18, marginTop: 0, paddingTop: 0 }}>Comments</Text>
                    {(isLoggedIn) ? <CommentInputPanel params={route.params} refreshComments={getComments} /> : <Button title="Login to comment" onPress={() => setModalShown(true)} />}
                    {commentsLoding ? <ActivityIndicator style={{height: 31*vh}} color="white" size="large" /> : (
                      <FlatList
                          data={comments}
                          keyExtractor={(item, index) => index}
                          renderItem={({ item }) => {
                              //console.log(item)
                              return (
                                  <UserComments
                                      name={item.author}
                                      comment={item.commentBody}
                                  ></UserComments>
                              )
                          }
                      }
                      />
                    )}
                </View>
            </View>
          </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
        backgroundColor: "#b03160"
    },
    videoView: {
        height: 37 * vh
    },
    commentView: {
        backgroundColor: "black",
        height: "100%",
        alignItems: "center",
        minHeight: 42.1*vh
    }
});

export default ReviewDetailsScreen;
