import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SortButton({
  icon,
  theme,
  buttonType,
  sortMethod,
  lastSelectedFilter,
  sortingTasksHandler,
}) {
  const styles = StyleSheet.create({
    buttonStyle: {
      width: "95%",
      height: 50,
      borderWidth: 3,
      borderColor: theme.secondary,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      padding: 7,
    },
    buttonText: {
      fontSize: 16,
      color: theme.text,
    },
  });

  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => {
        sortingTasksHandler(buttonType);
      }}
    >
      {icon}
      <Text style={styles.buttonText}>Sort by {sortMethod}</Text>
      {lastSelectedFilter.type === buttonType &&
      lastSelectedFilter.sorting === "ascending" ? (
        <AntDesign
          name="caretdown"
          size={24}
          color={theme.background}
          style={{ alignSelf: "flex-end" }}
        />
      ) : (
        <AntDesign
          name="caretup"
          size={24}
          color={theme.background}
          style={{ alignSelf: "flex-end" }}
        />
      )}
    </TouchableOpacity>
  );
}
