import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const Header: () => React$Node = () => {
  return (
    <View style={{width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "#006d6a", height: "8%"}}>
      <Text style={{color: "cyan", fontSize: 20, fontWeight:"bold"}}>Rating Mania</Text>
    </View>
  );
};


export default Header;