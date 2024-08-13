import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import HomePage from "./screen/HomePage";
import LoginPage from "./screen/auth/Login";
import { useEffect } from "react";
import authAction from "./store/actions/authAction";
import { useAuthStore } from "./store";
import BottomNav from "./components/BottomNav";
import DashboardHome from "./screen/AdminDashboard/DashboardHome";
import CategoryListScreen from "./screen/AdminDashboard/Categories/Categories";
import BrandListScreen from "./screen/AdminDashboard/BrandListScreen/BrandListScreen";
import ProductList from "./screen/AdminDashboard/ProductScreen/Products";
import AddProduct from "./screen/AdminDashboard/ProductScreen/AddProduct";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  console.log("home scrren ....");

  return (
    <>
      <HomePage />
      <BottomNav />
    </>
  );
};
const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};
const ProfileScreen2 = () => {

  const { setAuth, auth } = useAuthStore();

  async function Click() {
    try {
      const data = await authAction.verifyUser();
      if (data.user) {
        setAuth(data.user);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  return null;
  // return <Button onPress={Click} title="DD" />;
};


const MyStack = () => {
  return (
    <NavigationContainer>
      <ProfileScreen2 />
      <Stack.Navigator initialRouteName="AdminDashboard::Products">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AdminDashboard" options={{ headerShown: false }} component={DashboardHome} />
        <Stack.Screen name="AdminDashboard::Categories" options={{ headerShown: false }}
                      component={CategoryListScreen} />
        <Stack.Screen name="AdminDashboard::Brands" options={{ headerShown: false }} component={BrandListScreen} />
        <Stack.Screen name="AdminDashboard::Products" options={{ headerShown: false }} component={ProductList} />
        <Stack.Screen name="AdminDashboard::AddProduct" options={{ headerShown: false }} component={AddProduct} />
        <Stack.Screen name="AdminDashboard::UpdateProduct" options={{ headerShown: false }} component={AddProduct} />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
