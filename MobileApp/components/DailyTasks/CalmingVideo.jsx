import { Video } from "expo-av";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";

const allCalmingVideos = [
  require("../../videos/calmVideo1.mp4"),
  require("../../videos/calmVideo2.mp4"),
  require("../../videos/calmVideo3.mp4"),
  require("../../videos/calmVideo4.mp4"),
];

export default function CalmingVideo({ theme }) {
  const [fontsLoaded] = useFonts({
    "ShareTechMono-Regular": require("../../assets/fonts/ShareTechMono-Regular.ttf"),
  });

  const [timer, setTimer] = useState("00:00");
  const [video, setVideo] = useState(require("../../videos/calmVideo1.mp4"));

  //Used to set and on unmount to remove the interval for the timer
  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    const videoIndex = Math.floor(Math.random() * allCalmingVideos.length);

    setVideo(allCalmingVideos[videoIndex]);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //Called every second. Updates the timer
  function updateTimer() {
    setTimer((prevTime) => {
      const splitTime = prevTime.split(":");
      let minutes = Number(splitTime[0]);
      let seconds = Number(splitTime[1]);

      seconds += 1;

      if (seconds === 60) {
        minutes += 1;
        seconds = 0;
      }

      const formattedTime = `${minutes >= 10 ? minutes : "0" + minutes}:${
        seconds >= 10 ? seconds : "0" + seconds
      }`;

      return formattedTime;
    });
  }

  // Called when fullscreen changes
  const handleFullscreenUpdate = async ({ fullscreenUpdate }) => {
    if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    } else if (
      fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS
    ) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };

  const styles = StyleSheet.create({
    back: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: theme.primary + "5D",
      zIndex: 50,
    },
    mainDiv: {
      position: "absolute",
      width: "100%",
      height: 300,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderWidth: 5,
      borderColor: theme.secondary,
      borderRadius: 18,
      backgroundColor: theme.primary,
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      gap: 10,
      padding: 15,
      zIndex: 60,
      opacity: 1,
    },
    video: {
      width: 320,
      height: 200,
      zIndex: 60,
    },
    timer: {
      fontSize: 30,
      color: theme.text,
      fontFamily: "ShareTechMono-Regular",
    },
  });

  return (
    <View style={styles.back}>
      <Pressable style={styles.mainDiv} onPress={() => {}}>
        <Video
          source={video}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          ìsLooping
          useNativeControls
          style={styles.video}
          onFullscreenUpdate={handleFullscreenUpdate}
        />
        <Text style={styles.timer}>{timer}</Text>
      </Pressable>
    </View>
  );
}
