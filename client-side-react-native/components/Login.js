import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    Button,
    TextInput,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
const { vw, vh, vmin, vmax } = require('react-native-viewport-units');
import axios from "axios";
import baseUrl from "../assets/config/config";

const Login: () => React$Node = (props) => {
    const [ isLogin, setIsLogin ] = useState(true)
    const [ btnState, setBtnState ] = useState(true)
    const [ username, setUsername ] = useState("")
    const [ fullname, setFullname ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ confPassword, setConfPassword ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ message, setMessage ] = useState("")

    let onFieldValuesChange = (text, field) => {
        switch(field) {
          case "fullName":
          setFullname(text)
          break;
          case "email":
          setEmail(text)
          break;
          case "username":
          setUsername(text)
          break;
          case "password":
          setPassword(text)
          break;
          case "confPassword":
          setConfPassword(text)
          break;
        }
    }
    let submitHandler = async (btn) => {
      switch(btn) {
        case 'login':
        //console.log(username, password);
        if(username.trim() == "" || password.trim() == ""){
          setMessage("Do not keep the fields blank")
        } else {
          let response;
          try {
            response = await axios.post(`${baseUrl}/user/login`, { password, username });
            if(response.status == 200 && !response.data.status) props.loginChange()
          } catch (e) {
            setMessage(e.message)
            return
          }
          if(response.data.status) {
            setMessage(response.data.status)
          } else {
            try {
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('username', username)
                props.cancelModal()
              } catch (error) {
                console.log(error);
                setMessage(error.message)
            }
          }
        }
        break;
        case 'register':
        if(username.trim() == "" || password.trim() == "" || fullname.trim() == "" || email.trim() == "") {
          setMessage("All fields are required.")
          return
        }
        if(password !== confPassword){
          setMessage("Password don't match!")
          console.log("Passwords dont't match");
          return
        } else {
          let response;
          try {
            response = await axios.post(`${baseUrl}/user/register`, { email, password, username, name: fullname });
            console.log(response);
          } catch (e) {
            setMessage(e.message)
            return
          }
          if(response.data.status === "OK" || response.data.status === "Account already exists"){
            setMessage("Login now")
            styles.Color = "green"
            setIsLogin(true)
            setUsername('')
            setPassword('')
          } else {
            setMessage(response.data.status)
          }
        }
        break;
      }
    }
    return (
        <View>
            <Modal
                visible={props.visible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => props.cancelModal()}
            >
            <View style={styles.container}>
            <View style={styles.loginPad}>
              {isLogin ? <Text style={{marginTop: 2*vh, fontSize: 20}}>LOGIN</Text> : <Text style={{marginTop: 2*vh, fontSize: 20}}>REGISTER</Text>}
              {isLogin ? null : <TextInput style={styles.textInput} value={fullname} placeholder="firstname lastname" onChangeText={(text) => onFieldValuesChange(text, "fullName")}></TextInput>}
              {isLogin ? null : <TextInput style={styles.textInput} value={email} placeholder="Email" onChangeText={(text) => onFieldValuesChange(text, "email")}></TextInput>}
              <TextInput style={styles.textInput} value={username} placeholder="Enter username" onChangeText={(text) => onFieldValuesChange(text, "username")}></TextInput>
              <TextInput style={styles.textInput} value={password} secureTextEntry={true} placeholder="Enter password" onChangeText={(text) => onFieldValuesChange(text, "password")}></TextInput>
              {isLogin ? null : <TextInput style={styles.textInput} value={confPassword} secureTextEntry={true} placeholder="Confirm password" onChangeText={(text) => onFieldValuesChange(text, "confPassword")}></TextInput>}
              <View style={styles.mainButton}>
                {isLogin ? <TouchableOpacity><Button title="LOGIN" onPress={(e) => submitHandler('login')} color= "#212c41" /></TouchableOpacity> : <TouchableOpacity><Button title="REGISTER" onPress={(e) => submitHandler('register')} color= "#212c41" /></TouchableOpacity>}
              </View>
              <Text style={styles.Color}>{message}</Text>
              <View style={styles.subButtons}>
                <View style={styles.subButtonView}>
                  {isLogin ? <Button title="REGISTER" onPress={() => setIsLogin(cur => !cur)} /> : <Button title="LOGIN" onPress={() => setIsLogin(cur => !cur)} />}
                </View>
                <View style={styles.subButtonView}>
                  <Button title="Cancel"  color="#ff4541" color= "red" onPress={props.cancelModal}></Button>
                </View>
              </View>
            </View>
            </View>
            </Modal>
        </View>
    );
};

export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    loginPad: {
        backgroundColor: "#9de1fe",
        alignItems: "center",
        borderRadius: 10
    },
    textInput: {
      width: 84*vw,
      height: 6*vh,
      marginLeft: 6*vw,
      marginRight: 6*vw,
      borderWidth: 0.5,
      marginTop: 2*vh,
      marginBottom: 2*vh,
      borderRadius: 5
    },
    mainButton: {
      width: 40*vw,
      marginBottom: 2*vh
    },
    subButtons: {
      flexDirection: "row"
    },
    subButtonView: {
      margin: 12,
      width: 40*vw
    },
    Color: {
      color: 'red'
    }
})
