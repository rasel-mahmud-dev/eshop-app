
import Dot from "../Pagination/Dot";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Pagination = ({ style = {}, paginationIndex = 0, total, onPress }) => {
  return (
    <View style={[astyles.container, style]}>
      {Array.from({ length: total }).fill(1).map((_, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => onPress(index)}>
              <Dot index={index} key={index} paginationIndex={paginationIndex} />
            </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default Pagination



const astyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
