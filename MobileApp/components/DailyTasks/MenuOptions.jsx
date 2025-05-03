import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuOptions({ theme, topPosition, leftPosition }) {
  const COMPONENT_WIDTH = 150;

  const styles = StyleSheet.create({
    mainDiv: {
      width: COMPONENT_WIDTH,
      height: 200,
      backgroundColor: theme.primary,
      borderRadius: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      position: "absolute",
      top: topPosition,
      left: leftPosition - COMPONENT_WIDTH,
      zIndex: 50,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <TouchableOpacity>
        <Text>Sort by time</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sort by priority</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sort by stress level</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sort by duration</Text>
      </TouchableOpacity>
    </View>
  );
}
