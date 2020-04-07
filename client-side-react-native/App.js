import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./components/HomeScreen";
import ReviewDetailsScreen from "./components/ReviewDetailsScreen";
import AboutScreen from "./components/AboutScreen";
import ChatScreen from "./components/ChatScreen";
import Icon from "react-native-vector-icons/FontAwesome";//Entypo

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

let HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Reviews" component={ReviewDetailsScreen} />
    </Stack.Navigator>
  );
}

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={
            ({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'home'
                    : 'home';
                } else if (route.name === 'About') {
                  iconName = focused ? 'info-circle' : 'info-circle';
                } else if (route.name === "Chat") {
                  iconName = focused ? 'wechat' : 'wechat';
                }
                // You can return any component that you like here!
                return <Icon name={iconName} size={21} color={color} />;
              },
            })
          }
        >
          <Tab.Screen name="Home" component={HomeStackNavigator} />
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
