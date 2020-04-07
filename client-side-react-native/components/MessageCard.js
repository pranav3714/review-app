import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';
const { vw, vh, vmin, vmax } = require('react-native-viewport-units');


const MessageCard: () => React$Node = (props) => {
  if(props.type == "sent") {
    return (
      <View style={styles.messageCardSend}>
        <Text>{props.from} {props.timeAgo}</Text>
        <Text>{props.message}</Text>
      </View>
    );
  } else {
    console.log(props);
    return (
      <View style={styles.messageCardRecieve}>
        <Text>{props.from} {props.timeAgo}</Text>
        <Text>{props.message}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  messageCardRecieve: {
    alignSelf: "flex-start",
    backgroundColor: "lightgreen",
    margin: 4,
    maxWidth: "80%",
    minWidth: "60%",
    padding: 6,
    borderRadius: 10
  },
  messageCardSend: {
    alignSelf: "flex-end",
    backgroundColor: "white",
    margin: 4,
    maxWidth: "80%",
    minWidth: "60%",
    padding: 6,
    borderRadius: 10
  }
})
export default MessageCard;
