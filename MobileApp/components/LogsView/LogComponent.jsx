import { useRef } from "react";
import { Image, StyleSheet, Text, View, Animated } from "react-native";
import { formatHoursFromDate } from "../../utils/dateUtil";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const SWIPE_THRESHOLD = 100;

export default function LogComponent({ log, theme, user, removeLog }) {
  const translateX = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === 5) {
      // 5 = State.END
      if (
        nativeEvent.translationX > SWIPE_THRESHOLD ||
        nativeEvent.translationX < -SWIPE_THRESHOLD
      ) {
        removeLog(0);
      }

      // Reset position
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const styles = StyleSheet.create({
    mainDiv: {
      flexDirection: "row",
      width: "100%",
      height: 80,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.secondary,
    },
    imageDiv: {
      flexBasis: "20%",
      justifyContent: "center",
      alignItems: "center",
    },
    contextDiv: {
      flexBasis: "80%",
      justifyContent: "center",
      gap: 10,
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 25, // must be number, not string
    },
    messageText: {
      fontSize: 18,
      color: theme.text,
    },
    timeText: {
      fontSize: 15,
      color: theme.text,
    },
  });

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[styles.mainDiv, { transform: [{ translateX }] }]}
        >
          <View style={styles.imageDiv}>
            <Image style={styles.userImage} source={{ uri: user.image }} />
          </View>
          <View style={styles.contextDiv}>
            <Text style={styles.messageText}>{log.message}</Text>
            <Text style={styles.timeText}>
              {formatHoursFromDate(log.createdAt)}
            </Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
