import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    Alert
} from 'react-native';
const { vw, vh, vmin, vmax } = require('react-native-viewport-units');
import Icon from "react-native-vector-icons/EvilIcons";
import FIcon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import baseUrl from "../assets/config/config";

const CommentInputPanel: () => React$Node = (props) => {
  //console.log(props);
  const [token, setToken] = useState()
  const [commentText, setCommentText] = useState("")
  let asyncDataGather = async () => {
    let memToken = await AsyncStorage.getItem('token')
    if(memToken !== null) {
      //console.log(memToken);
      setToken(memToken)
    }
  }
  asyncDataGather()
  let postCommentAsync = async (comment) => {
    if(commentText.trim().length == 0) {
      //console.log('empty');
      return
    }
    else if(commentText.trim().length > 200) {
      setCommentText(commentText.slice(0, 199))
      Alert.alert( 'Comment too big.', 'Comments cannot be greater than 200 characters long.', [ {text: 'OK', onPress: () => console.log('OK Pressed')} ], { cancelable: true } )
      //axios.post(`${baseUrl}/comments/post`, {commentBody: commentText, movieId: })
      return
    }
    else {
      try {
          let res = await axios.post(`${baseUrl}/comments/post`, {commentBody: commentText, movieId: props.params.id}, { headers: { Authorization: "Bearer " + token } })
          setCommentText("")
          props.refreshComments()
          //console.log(res);
        } catch (e) {
          Alert.alert( 'Network Error', e.message, [ {text: 'OK', onPress: () => console.log('OK Pressed')} ], { cancelable: false })
          return
        }
    }
  }
  let textChangeHandler = (text) => {
    setCommentText(text)
  }
    return (
        <View style={{alignItems: "center"}}>
            <View style={styles.inputPanel}>
                <Icon name="user" size={55} style={{ borderRadius: 50 }} color="white" />
                <TextInput style={styles.inputText} value={commentText} onChangeText={textChangeHandler} placeholderTextColor="grey" placeholder="Submit public comment" />
                <TouchableOpacity onPress={postCommentAsync}><FIcon name="send" size={29} style={{ marginTop: 1*vh }} color="white" /></TouchableOpacity>
            </View>
            <View style={{ borderWidth: 0.5, borderColor: "grey", width: 100 * vw, marginTop: 3}} />
        </View>
    );
};

const styles = StyleSheet.create({
    inputPanel: {
        flexDirection: "row",
        width: 90 * vw,
        height: 7.5 * vh,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5
    },
    avatar: {
        backgroundColor: "lightblue",
        width: 14 * vw,
        borderRadius: 60,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    inputText: {
        width: "70%",
        color: "white"
    }
})
export default CommentInputPanel;
