import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  AsyncStorage,
  FlatList,
  Button,
  Keyboard
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import MessageCard from "./MessageCard";
import axios from "axios";
import baseUrl from "../assets/config/config";
import wslink from "../assets/config/wsCgf.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Login from "./Login";

let ChatScreen: () => React$Node = () => {
  const [ chatMsg, setChatMsg ] = useState("")
  const [ isSendDisabled, setIsSendDisabled ] = useState(true)
  const [ isLogin, setIsLogin ] = useState(false)
  const [ socke, setSock ] = useState({})
  const [ rMessages, setRMessages ] = useState([])
  const [ userName, setUsername ] = useState("")
  const [ modelState, setModelState ] = useState(false)
  const msgRef = useRef(null)

  let token, username;
  let scrollToLast = () => {
    msgRef.current.scrollToEnd()
    //console.log(msgRef.current);
  }
  ////console.log(wslink);
  let getToken = async () => {
    token = await AsyncStorage.getItem('token')
    username = await AsyncStorage.getItem('username')
    await setUsername(username)
    if(token == null) return
    else {
      setIsLogin(true)
      return await setSocket()
    }
  }
  let setSocket = async () => {
    let sock = new WebSocket(wslink);
    sock.onopen = () => {
      //console.log("open");
      sock.send(JSON.stringify({type:"auth", token}))
      setIsSendDisabled(false)
    };
    sock.onmessage = ({data}) => {
        ////console.log(data);
        setRMessages(cur => [...cur, JSON.parse(data)])
        setTimeout(() => scrollToLast(), 10)
        ////console.log(rMessages);
    }
    sock.onclose = () => {
      //console.log("disconnected");
      setIsSendDisabled(true)
      setTimeout(() => setSocket(), 100)
    }
    setSock(sock)
  }

  useEffect(() => {
    getToken()
  },[])
  let changeHandler = (text) => {
    setChatMsg(text)
  }
  let sendHandler = (e) => {
    if(chatMsg.trim() == ""){
      return
    }
    socke.send(JSON.stringify({type: "chat", value: chatMsg.trim()}))
    ////console.log(chatMsg);
    setChatMsg("")
  }
  let closeModel = () => {
    setModelState(false)
  }
  let openModel = () => {
    setModelState(true)
  }
  let setLogin = () => {
    setIsLogin(true)
    getToken()
  }

  ////console.log(rMessages);
  //console.log(this);
  return (
    <ImageBackground
    source={{uri: "https://i.pinimg.com/originals/5a/59/89/5a5989304fb17fa83addb757e8b4dd6e.jpg"}}
    style={{width: '100%', height: '100%'}}
    >
    <Login visible={modelState} cancelModal={closeModel} loginChange={setLogin}></Login>
    <SafeAreaView style={styles.container} removeClippedSubviews={false}>
      <View style={styles.forMesgs}>
      <FlatList
      ref = {msgRef}
      removeClippedSubviews={false}
      data = {rMessages}
      keyExtractor={(item, index) => index}
      renderItem={({item}) => {
        if(item.author == userName) {
          return <MessageCard type={"sent"} from={"You"} timeAgo={"1min ago"} message={item.value} />
        } else {
          return <MessageCard type={"recieved"} from={item.author} timeAgo={"1min ago"} message={item.value} />
        }
      }}
      />
      </View>
      {(!isLogin) ? <Button title="Click to login" onPress={openModel} /> : (
        <View style={styles.forChatInput}>
          <View style={styles.chatInput}>
          <TextInput
          placeholder="Enter message here"
          value={chatMsg}
          multiline={true}
          numberOfLines={5}
          onChangeText={changeHandler}
          onContentSizeChange = {() => scrollToLast()}
          ></TextInput>
          </View>
          <TouchableOpacity style={{padding: 0, margin: 0}} disabled={isSendDisabled} onPress={sendHandler}>
          <View style={styles.sendIcon}>
            <Icon name="send" color="white" size={33} style={{marginLeft: "6%", marginTop: "5%"}} />
          </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
    </ImageBackground>
  );
};
ChatScreen = React.memo(ChatScreen)
export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  forMesgs: {
    width: "98%",
    height: "90%"
  },
  forChatInput: {
    width: "98%",
    height: "9%",
    marginTop: "0.5%",
    flexDirection: "row"
  },
  chatInput: {
    width: "85%",
    backgroundColor: "cyan",
    height: "100%",
    borderRadius: 10,
    marginRight: "1%"
  },
  sendIcon: {
    width: "200%",
    height: "100%",
    backgroundColor: "black",
    borderRadius: 25
  }
})
