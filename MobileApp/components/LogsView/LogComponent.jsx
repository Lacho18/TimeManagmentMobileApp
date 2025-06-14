import { useRef } from "react";
import { Image, StyleSheet, Text, View, Animated } from "react-native";
import {
  equalDates,
  formatHoursFromDate,
  formatDate,
} from "../../utils/dateUtil";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const SWIPE_THRESHOLD = 100;

export default function LogComponent({ log, theme, user, removeLog }) {
  const now = new Date();
  const translateX = useRef(new Animated.Value(0)).current;

  //console.log(log.createdAt.toDate());

  const onGestureEvent = Animated.event(
    // Map the horizontal drag (translationX) from gesture to the translateX animated value
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true } // Use native driver for smoother performance
  );

  //Detects whether the user has swiped the log over the limit which deletes it
  function onHandlerStateChange({ nativeEvent }) {
    if (nativeEvent.state === 5) {
      if (
        nativeEvent.translationX > SWIPE_THRESHOLD ||
        nativeEvent.translationX < -SWIPE_THRESHOLD
      ) {
        removeLog(log.id);
      }

      // Reset position
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }

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
      borderRadius: 25,
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
            <Image
              style={styles.userImage}
              source={{
                uri:
                  user.image === ""
                    ? "https://cdn-icons-png.flaticon.com/512/666/666201.png"
                    : user.image,
              }}
            />
          </View>
          <View style={styles.contextDiv}>
            <Text style={styles.messageText}>{log.message}</Text>
            <Text style={styles.timeText}>
              {equalDates(now, log.createdAt)
                ? formatHoursFromDate(log.createdAt)
                : formatDate(log.createdAt)}
            </Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
