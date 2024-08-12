import * as React from "react";

import {
  StatusBar,
  useColorScheme,
} from "react-native";

import {
  Colors,

} from "react-native/Libraries/NewAppScreen";
import MyStack from "./MyStack";
// import "../global.css"

function App() {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <  >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MyStack />
    </>
  );
}


export default App;
