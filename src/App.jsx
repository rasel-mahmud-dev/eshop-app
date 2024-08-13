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
    backgroundColor: isDarkMode ? "rgba(111,169,218,0.98)" : Colors.lighter,
  };

  return (
    <  >
      <StatusBar
        // translucent={true}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MyStack />
    </>
  );
}


export default App;
