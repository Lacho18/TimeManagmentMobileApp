import { Video } from "expo-av";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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

  //Called every second. Updates the timer
  function updateTimer() {
    const splitTime = timer.split(":");
    let seconds = Number(splitTime[1]);
    let minutes = Number(splitTime[0]);

    seconds += 1;

    if (seconds == 60) {
      minutes += 1;
      seconds = 0;
    }

    setTimer(
      `${minutes >= 10 ? minutes : "0" + minutes}:${
        seconds >= 10 ? seconds : "0" + seconds
      }`
    );
  }

  //Used to set and on unmount to remove the interval for the timer
  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    const videoIndex = Math.floor(Math.random() * allCalmingVideos.length);

    setVideo(allCalmingVideos[videoIndex]);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
      <View style={styles.mainDiv}>
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
        />
        <Text style={styles.timer}>{timer}</Text>
      </View>
    </View>
  );
}
