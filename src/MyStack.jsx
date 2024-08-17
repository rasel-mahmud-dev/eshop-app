import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
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
import RegistrationPage from "./screen/auth/Registration";
import UsersList from "./screen/AdminDashboard/UsersList/UsersList";
import RolesList from "./screen/AdminDashboard/RolesList/RolesList";
import ManageRoles from "./screen/AdminDashboard/RolesList/ManageRoles";
import Profile from "./screen/ProfileScreen/Profile";
import MoreCategories from "./components/HomeScreen/MoreCategories";
import HomeProducts from "./components/HomeScreen/Sticky";
import ManageHomeCategoryDetail from "./screen/AdminDashboard/Categories/ManageHomeCategoryDetail";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {

  return (
    <>
      <HomePage />
      <BottomNav />
    </>
  );
};


const ProfileScreen2 = () => {

  const { setAuth, auth } = useAuthStore();

  async function Click() {
    try {
      const auth = await authAction.verifyUser();
      if (auth) {
        setAuth(auth);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    Click();
  }, []);

  return null;
  // return <Button onPress={Click} title="DD" />;
};


const MyStack = () => {
  const { auth } = useAuthStore();
  return (
    <NavigationContainer>
      <ProfileScreen2 />
      <Stack.Navigator initialRouteName="AdminDashboard::ManageHomeCategoryDetail">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
        <Stack.Screen name="MoreCategories" options={{ headerShown: false }} component={MoreCategories} />

        <Stack.Screen name="AdminDashboard" options={{ headerShown: false }} component={DashboardHome} />
        <Stack.Screen name="AdminDashboard::ManageHomeCategoryDetail" options={{ headerShown: false }} component={ManageHomeCategoryDetail} />

        <Stack.Screen name="AdminDashboard::Categories" options={{ headerShown: false }}
                      component={CategoryListScreen} />
        <Stack.Screen name="AdminDashboard::Brands" options={{ headerShown: false }} component={BrandListScreen} />
        <Stack.Screen name="AdminDashboard::Products" options={{ headerShown: false }} component={ProductList} />
        <Stack.Screen name="AdminDashboard::AddProduct" options={{ headerShown: false }} component={AddProduct} />
        <Stack.Screen name="AdminDashboard::UpdateProduct" options={{ headerShown: false }} component={AddProduct} />
        <Stack.Screen name="AdminDashboard::Users" options={{ headerShown: false }} component={UsersList} />
        <Stack.Screen name="AdminDashboard::Roles" options={{ headerShown: false }} component={RolesList} />
        <Stack.Screen name="AdminDashboard::ManageRoles" options={{ headerShown: false }} component={ManageRoles} />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={RegistrationPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
