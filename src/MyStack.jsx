import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./screen/HomePage";
import LoginPage from "./screen/auth/Login";
import { useEffect } from "react";
import authAction from "./store/actions/authAction";
import { useAuthStore, useCartStore } from "./store";
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
import ManageHomeCategoryDetail from "./screen/AdminDashboard/Categories/ManageHomeCategoryDetail";
import LocalStorage from "./services/LocalStorage";
import WithAuth from "./ScreenGuard/WithAuth";
import CartPage from "./screen/CartScreen";
import CheckoutPage from "./screen/CheckoutPage";
import ProductDetail from "./screen/ProductDetail";
import cartsAction from "./store/actions/cartsAction";
import HomeLayout from "./components/Layout/HomeLayout";
import SearchSuggestion from "./screen/SearchSuggestion";

const Stack = createNativeStackNavigator();


const ProfileScreen2 = () => {
  const { setAuth, auth } = useAuthStore();
  const { setCarts } = useCartStore();

  async function authFetch() {
    try {
      const auth = await authAction.verifyUser();
      if (auth) {
        setAuth(auth);
        cartsAction.fetchCarts()
          .then(items => {
          setCarts(items);
        });
      } else {
        setAuth(null);
      }

    } catch (ex) {
      setAuth(null);
      console.log(ex);
    }
  }

  useEffect(() => {
    authFetch();
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    LocalStorage.get("screen").then(name => {
      navigation.navigate(name);
    });
  }, []);

  return null;
  // return <Button onPress={Click} title="DD" />;
};

function handleChangeState(e) {
  const routes = e.routes.slice(e.routes.length - 1);
  const name = routes?.[0]?.name;
  if (name) {
    LocalStorage.set("screen", name).then(r => {
    });
  }
}

const MyStack = () => {
  const { auth } = useAuthStore();

  return (
    <NavigationContainer onStateChange={handleChangeState}>
      <ProfileScreen2 />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeLayout(HomePage)}
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen name="Profile" options={{ headerShown: false }} component={HomeLayout(WithAuth(Profile))} />
        <Stack.Screen name="SearchSuggestion" options={{ headerShown: false }} component={SearchSuggestion} />
        <Stack.Screen name="ProductDetail" options={{ headerShown: false }} component={ProductDetail} />
        <Stack.Screen name="Cart" options={{ headerShown: false }} component={HomeLayout(WithAuth(CartPage))} />
        <Stack.Screen name="Checkout" options={{ headerShown: false }} component={WithAuth(CheckoutPage)} />
        <Stack.Screen name="MoreCategories" options={{ headerShown: false }} component={MoreCategories} />
        <Stack.Screen name="Categories" options={{ headerShown: false }} component={MoreCategories} />

        <Stack.Screen name="AdminDashboard" options={{ headerShown: false }} component={DashboardHome} />
        <Stack.Screen name="AdminDashboard::ManageHomeCategoryDetail" options={{ headerShown: false }}
                      component={ManageHomeCategoryDetail} />

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
