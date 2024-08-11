import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
const ShadowPropSlider = ({label, value, ...props}) => {
  return (
    <>
      <Text>
        {label} ({value.toFixed(2)})
      </Text>
      <Slider step={1} value={value} {...props} />
    </>
  );
};

const App1 = () => {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
  const [shadowRadius, setShadowRadius] = useState(0);
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.square,
          
        ]}
      />
      <View style={styles.controls}>
        <ShadowPropSlider
          label="shadowOffset - X"
          minimumValue={-50}
          maximumValue={50}
          value={shadowOffsetWidth}
          onValueChange={setShadowOffsetWidth}
        />
        <ShadowPropSlider
          label="shadowOffset - Y"
          minimumValue={-50}
          maximumValue={50}
          value={shadowOffsetHeight}
          onValueChange={setShadowOffsetHeight}
        />
        <ShadowPropSlider
          label="shadowRadius"
          minimumValue={0}
          maximumValue={100}
          value={shadowRadius}
          onValueChange={setShadowRadius}
        />
        <ShadowPropSlider
          label="shadowOpacity"
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          value={shadowOpacity}
          onValueChange={val => setShadowOpacity(val)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  square: {
    elevation: 20, // for Android
    shadowOffset: { width: 0, height: 10 }, // Adjust height for vertical shadow position
    shadowOpacity: 0.8, // Adjust opacity for shadow visibility
    shadowColor: "blue",
    shadowRadius: 20, // Increase radius for a softer shadow edge
    position: 'relative',
    alignSelf: 'center',
    backgroundColor: 'white',
    height: 150,
    width: 150,
  },
  controls: {
    paddingHorizontal: 12,
  },
});

export default App1;