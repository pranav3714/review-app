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
import Icon from "react-native-vector-icons/FontAwesome";


const AboutScreen: () => React$Node = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
      <View style={{ backgroundColor: "lightblue", width: "75%", borderRadius: 10, elevation: 20, padding: 10 }}>
        <View style={{backgroundColor: "pink", width: "100%", alignItems: "center", padding: 10, borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
          <Text style={{fontSize: 20 }}>Native Reviews</Text>
        </View>
        <View style={{alignItems: "center", padding: 8}}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Version 0.1</Text>
          <Text>Written with love from BlackSilver</Text>
          <Text>TechZilla</Text>
          <View style={{ width: "20%", margin: 5, alignItems: "center" }}>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/pranav3714')}>
              <Icon name="github" color="purple" size={50} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AboutScreen;
