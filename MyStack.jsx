import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import HomePage from "./src/screen/HomePage";

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
    console.log("home scrren ....");

    return (
      <>

        <HomePage />
        </>
    );
  };
  const ProfileScreen = ({navigation, route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
  };


const MyStack = () => {
    console.log("ksdfhdfhdsfjdskfhsdkfj")
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack
