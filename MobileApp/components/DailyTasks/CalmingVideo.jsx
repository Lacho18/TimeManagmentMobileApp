import { Video } from "expo-av";
import { StyleSheet, Text, View } from "react-native";
//import YoutubePlayer from "react-native-youtube-iframe";

export default function CalmingVideo({ theme }) {
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
      padding: 15,
      zIndex: 60,
      opacity: 1,
    },
    video: {
      width: 320,
      height: 200,
      zIndex: 60,
    },
  });

  return (
    <View style={styles.back}>
      <View style={styles.mainDiv}>
        <Video
          source={{
            uri: "https://www.youtube.com/watch?v=eA9IvKdCA5w&ab_channel=Fiki",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          useNativeControls
          style={styles.video}
        />
      </View>
    </View>
  );
}
