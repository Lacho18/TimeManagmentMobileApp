import { useEffect, useRef, useMemo, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

export default function SelectedTask({ selectedTask, theme, hideTask }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["50%"], []);

  const handleSheetChanges = (index) => {
    console.log("Sheet moved to index:", index);

    if (index === -1) {
      console.log("Sheet closed!");
      setIsModalVisible(false);
      hideTask();
    }
  };

  useEffect(() => {
    if (selectedTask) {
      setIsModalVisible(true);
    }
  }, [selectedTask]);

  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  if (!isModalVisible) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(false);
        hideTask();
      }}
    >
      <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
        <BottomSheetModalProvider>
          <View style={StyleSheet.absoluteFillObject}>
            <BottomSheet
              ref={bottomSheetRef}
              index={0} // Start fully open at 50%
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              enablePanDownToClose={true}
              backgroundStyle={{ backgroundColor: theme?.primary || "white" }}
              handleIndicatorStyle={{ backgroundColor: "grey", width: 75 }}
            >
              <BottomSheetView style={styles.contentContainer}>
                <Text>Awesome 🎉</Text>
              </BottomSheetView>
            </BottomSheet>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Modal>
  );
}
